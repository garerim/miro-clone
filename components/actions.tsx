"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";

import { Link2, Pencil, Trash2 } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionsProps) => {
    const {onOpen} = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"));
    }

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board deleted"))
            .catch(() => toast.error("Failed to delete board"));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                className="w-60"
                onClick={(e) => e.stopPropagation()}
            >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="mr-2 w-4 h-4" />
                    Copy board link
                </DropdownMenuItem>

                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="mr-2 w-4 h-4" />
                    Rename
                </DropdownMenuItem>

                <ConfirmModal 
                header="Delete board ?"
                description="This will delete the board and all of its contents."
                disabled={pending}
                onConfirm={onDelete}
                >
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="mr-2 w-4 h-4" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
