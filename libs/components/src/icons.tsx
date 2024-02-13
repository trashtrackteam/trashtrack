import {
    Home,
    ClipboardEdit,
    UserPlus,
    Settings2,
    UserCog,
    Trash,
    Trash2,
    ClipboardSignature,
    ChevronLeft,
    type Icon as LucideIcon,
    LayoutDashboard,
    Plus,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
    home: Home,
    settings: Settings2,
    complain: ClipboardEdit,
    login: UserPlus,
    dashboard: LayoutDashboard,
    user: UserCog,
    trash: Trash,
    add: Plus,
    subTrashbin: Trash2,
    report: ClipboardSignature,
    back: ChevronLeft,
};
