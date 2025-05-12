import { AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { useTradeCreatorTokenContext } from "../hooks";

export default function Component() {
    const { token } = useTradeCreatorTokenContext();

    return (
        <footer>
            <AlertDialogTitle>Trade</AlertDialogTitle>
            <AlertDialogDescription>
                Kindly select the token you wish to trade {token} with below
            </AlertDialogDescription>
        </footer>
    );
}
