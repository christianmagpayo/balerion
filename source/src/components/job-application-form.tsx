import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check, Paperclip, X } from 'lucide-react';
import { useGetApplicationStatus, submitApplication, type ApplicationInput } from '@workspace/api-client-react';

export type ApplicationValues = { fullName: string; email: string; phone: string; resume: File | null; workUrl: string; linkedinUrl: string };
export const emptyApplication: ApplicationValues = { fullName: '', email: '', phone: '', resume: null, workUrl: '', linkedinUrl: '' };

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-ink';
const input = `w-full rounded-md border border-white/15 bg-white/[0.03] px-3.5 py-3 text-sm text-bone placeholder:text-bone/30 transition-colors hover:border-white/25 focus:border-ember invalid:[&:not(:placeholder-shown)]:border-destructive/70 ${focus}`;

function Field({ id, label, required, hint, children }: { id: string; label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1 text-sm font-medium text-bone">
        {label}{required ? <span className="text-ember" aria-hidden>*</span> : <span className="ml-1 font-mono text-[10px] uppercase tracking-widest text-bone/35">Optional</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="-mt-1 mb-2 text-xs text-bone/45">{hint}</p>}
      {children}
    </div>
  );
}

function encodeResume(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('Unable to read your resume. Please select the file again.'));
    reader.readAsDataURL(file);
  });
}

export function JobApplicationForm({ roleId, values, onChange }: { roleId: ApplicationInput['roleId']; values: ApplicationValues; onChange: (v: ApplicationValues) => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const lock = useRef(false);
  const { data: status, isError, refetch } = useGetApplicationStatus({
    query: { retry: false, refetchOnWindowFocus: true, refetchInterval: 30_000, staleTime: 30_000 },
  });
  const set = (k: Exclude<keyof ApplicationValues, 'resume'>) => (e: { target: { value: string } }) => {
    onChange({ ...values, [k]: e.target.value });
  };
  const selectResume = (files: FileList | null) => {
    if (!files?.length) return;
    if (files.length !== 1 || !/\.(pdf|doc|docx)$/i.test(files[0].name) || !files[0].size || files[0].size > 5 * 1024 * 1024 || files[0].name.length > 180) {
      setError('Choose one PDF, DOC, or DOCX resume no larger than 5 MB.');
      return;
    }
    setError('');
    onChange({ ...values, resume: files[0] });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lock.current || submitted) return;
    setError('');
    if (!values.resume) { setError('Please attach your resume.'); fileInput.current?.focus(); return; }
    const website = String(new FormData(e.currentTarget).get('website') ?? '');
    lock.current = true;
    setSubmitting(true);
    try {
      const receipt = await submitApplication({
        roleId,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        workUrl: values.workUrl.trim() || undefined,
        linkedinUrl: values.linkedinUrl.trim() || undefined,
        resumeName: values.resume.name,
        resumeBase64: await encodeResume(values.resume),
        website,
      });
      if (!receipt.id) throw new Error('Submission was not confirmed. Please try again.');
      setSubmitted(true);
      onChange({ ...emptyApplication });
    } catch (failure) {
      const details = failure as { data?: { error?: string }; message?: string };
      setError(details.data?.error || 'We could not confirm submission. Your details and resume are still here; please try again.');
    } finally {
      lock.current = false;
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <div role="status" className="rounded-lg border border-ember/30 bg-ember/[0.06] p-6" data-testid="application-success">
      <Check className="mb-3 text-ember" size={24} />
      <h2 className="font-display text-2xl text-bone">Application submitted.</h2>
      <p className="mt-2 text-sm text-bone/65">Thank you for applying. Your details and resume have been submitted to our hiring team.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-6" data-testid="form-application">
      {(status?.available === false || isError) && <p role="status" className="rounded-lg border border-ember/25 p-4 text-sm text-bone/70">{status?.available === false ? 'Application email delivery has not been set up yet. Completing this form will not send an application until setup is finished.' : 'We could not check application delivery. You can try submitting again; your details will stay here if it fails.'} <button type="button" onClick={() => refetch()} className="text-ember underline">Check again</button></p>}
      <fieldset disabled={submitting} className="space-y-6 disabled:opacity-60">
      <div className="sr-only" aria-hidden="true"><label htmlFor="app-website">Leave this blank</label><input id="app-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="app-name" label="Full name" required><input id="app-name" required maxLength={120} autoComplete="name" placeholder="Ada Lovelace" value={values.fullName} onChange={set('fullName')} className={input} data-testid="input-full-name" /></Field>
        <Field id="app-email" label="Email" required><input id="app-email" type="email" required maxLength={254} autoComplete="email" placeholder="you@domain.com" value={values.email} onChange={set('email')} className={input} data-testid="input-email" /></Field>
        <Field id="app-phone" label="Phone"><input id="app-phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+1 415 555 0142" value={values.phone} onChange={set('phone')} className={input} data-testid="input-phone" /></Field>
      </div>

      <Field id="app-resume" label="Resume" required hint="PDF, DOC, or DOCX · Maximum 5 MB">
        <div onDragOver={(e) => { e.preventDefault(); if (!submitting) setDragging(true); }} onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); if (!submitting) selectResume(e.dataTransfer.files); }}
          className={`rounded-lg border border-dashed p-6 text-center transition-colors ${dragging ? 'border-ember bg-ember/10' : 'border-white/20 bg-white/[0.02]'}`} data-testid="resume-dropzone">
          <Paperclip size={20} className="mx-auto mb-3 text-ember" />
          <input ref={fileInput} id="app-resume" type="file" accept=".pdf,.doc,.docx" aria-describedby="app-resume-hint" className="sr-only" onChange={(e) => { selectResume(e.target.files); e.target.value = ''; }} data-testid="input-resume-file" />
          {values.resume ? <div className="flex items-center justify-center gap-3"><span className="break-all text-sm text-bone">{values.resume.name}</span><button type="button" aria-label="Remove resume" onClick={() => onChange({ ...values, resume: null })} className={`shrink-0 text-bone/60 hover:text-bone ${focus}`}><X size={16} /></button></div>
            : <p className="text-sm text-bone/55">Drag and drop your resume here</p>}
          <button type="button" onClick={() => fileInput.current?.click()} className={`mt-3 text-sm text-ember underline underline-offset-4 ${focus}`}>{values.resume ? 'Choose another file' : 'Choose file'}</button>
        </div>
      </Field>

      <div className="border-t border-white/10 pt-6">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Links</p>
        <div className="space-y-6">
          <Field id="app-work" label="GitHub or portfolio"><input id="app-work" type="url" maxLength={500} placeholder="https://github.com/" value={values.workUrl} onChange={set('workUrl')} className={input} data-testid="input-work-url" /></Field>
          <Field id="app-linkedin" label="LinkedIn"><input id="app-linkedin" type="url" maxLength={500} placeholder="https://linkedin.com/in/" value={values.linkedinUrl} onChange={set('linkedinUrl')} className={input} data-testid="input-linkedin-url" /></Field>
        </div>
      </div>

      <button type="submit" disabled={submitting} className={`inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ember/80 disabled:cursor-not-allowed disabled:opacity-50 ${focus}`} data-testid="button-submit-application">{submitting ? 'Submitting…' : 'Submit Application'} <ArrowUpRight size={15} /></button>
      </fieldset>
      {error && <p role="alert" className="text-sm text-bone/80" data-testid="application-error">{error}</p>}
    </form>
  );
}
