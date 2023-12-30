import * as React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import DeleteSubject from "lta/actions/delete-subject";

type Props = {
    subject_code: string;
};
export default function DeleteSubjectBtn({ subject_code }: Props) {
    const [isRemoving, setisRemoving] = React.useState<boolean>(false);
    const handleDeleteAction = async () => {
        setisRemoving(true);
        await DeleteSubject(subject_code);
        setisRemoving(false);
    };
    return (
        <button
            type="button"
            onClick={handleDeleteAction}
            className="btn btn-error btn-sm"
            disabled={isRemoving}
        >
            <IoAddCircleOutline className="text-lg" />
            Xoá
        </button>
    );
}
