import * as React from "react"

export const RouteParams = React.createContext<{ slug?: string }>({})
export function useParams<T>() {
    return React.useContext(RouteParams) as T
}
export function useRoute(_pattern: string) {
    const params = React.useContext(RouteParams)
    return [Boolean(params.slug), params] as const
}
// Real links work with the native Framer pages listed in ROUTES.md.
// Do not intercept history: Framer owns routing, not the old Vite router.
export const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
    function FramerPageLink(props, ref) {
        return <a ref={ref} {...props} />
    }
)
