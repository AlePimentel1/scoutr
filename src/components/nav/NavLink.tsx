import { TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Tooltip, TooltipContent } from "../ui/tooltip"

export default function NavLink({
    label,
    href,
    className = "text-[#1F2937] text-[14px]",
    target = "",
    onAction = undefined,
    isSelected = false,
    slug,
    isCollapsedMenu = false,
    currentSlug,
}: any) {
    const isSelect = (slug && currentSlug && slug === currentSlug) || isSelected

    return (
        <SideBarTooltip content={label} active={isCollapsedMenu}>
            <Link
                href={onAction ? 'javascript:void(0)' : href}
                className={cn(
                    `flex relative  ${isCollapsedMenu
                        ? "lg:px-0  lg:justify-start hover:bg-blue-100   lg:text-start lg:h-[38px] lg:w-[42px] lg:py-[10px] "
                        : "hover:bg-blue-100 h-[30px] truncate"
                    } ${isSelect ? isCollapsedMenu ? 'lg:bg-primary text-white hover:bg-primary/80' : 'bg-blue-100' : ""
                    } shrink-0 items-center px-2 justify-between py-[5px]  whitespace-nowrap rounded-[4px] group `,
                    className
                )}
                target={target}
                style={{ textDecoration: "none" }}
                onClick={onAction}
            >
                <div className={`${isCollapsedMenu ? 'lg:justify-center' : ''} flex items-center  w-full h-full gap-2`}>
                    <span className={`flex ${!isCollapsedMenu ? 'flex' : 'lg:hidden'} items-center text-[14px] gap-1 font-medium`}>
                        {label}
                    </span>
                </div>
            </Link>
        </SideBarTooltip>
    )
}

export function SideBarTooltip({ children, content, active }: { children: React.ReactNode; content: any; active: boolean }) {
    return active ? (
        <Tooltip delayDuration={500}>
            <TooltipTrigger className="w-full shrink-0 h-auto p-0 pb-0 m-0">{children}</TooltipTrigger>
            <TooltipContent
                align="start"
                sideOffset={-10}
                alignOffset={20}
                className="m-0 p-0 shrink-0 hidden lg:flex whitespace-nowrap px-2 left-6 text-[12px] absolute rounded-md "
            >
                {content}
            </TooltipContent>
        </Tooltip>
    ) : (
        children
    )
}
