import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { BalerionPage, websiteCSS } from "./BalerionRuntime"
import { ASSET_BASE_URL } from "./BalerionConfig"

type Props = {
    page: string
    slug: string
    style?: React.CSSProperties
}

/**
 * Complete Balerion marketing pages, including navigation and footer.
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 1100
 */
export default function BalerionSite({ page = "Home", slug = "", style }: Props) {
    const canvas = RenderTarget.current() === RenderTarget.canvas
    const root = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        // Canvas frames may not enter the browser viewport. Show their content
        // while keeping the original reveal animations in Preview/published pages.
        if (canvas) root.current?.querySelectorAll(".reveal").forEach(el => el.classList.add("in"))
    }, [canvas, page, slug])
    return (
        <div ref={root} className={`balerion-framer${canvas ? " balerion-canvas" : ""}`}
            style={{ ...style, position: "relative", width: "100%", minHeight: 300, background: "#0a0a0a" }}>
            <style>{websiteCSS}</style>
            {canvas && !ASSET_BASE_URL && (
                <div style={{ padding: 12, background: "#17232a", color: "#dbe8ef", font: "12px sans-serif" }}>
                    Set ASSET_BASE_URL in BalerionConfig.tsx to load the included photos and logos.
                </div>
            )}
            <BalerionPage page={page} slug={slug} />
        </div>
    )
}

addPropertyControls(BalerionSite, {
    page: {
        type: ControlType.Enum,
        title: "Page",
        options: ["Home", "Product", "Research", "Team", "Security", "Press", "Careers", "Job", "Case study"],
        defaultValue: "Home",
    },
    slug: { type: ControlType.String, title: "Detail slug", defaultValue: "" },
})
