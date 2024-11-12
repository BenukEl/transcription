import { useRef } from "react";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

type Props = {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isUploading: boolean;
};

export function FileUploader(props: Props) {
    const { onFileUpload, isUploading } = props;

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { classes, cx } = useStyles();

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={cx(classes.root)}>
            <input
                ref={fileInputRef}
                type="file"
                className={classes.input}
                onChange={onFileUpload}
                disabled={isUploading}
            />
            <Button iconId="ri-upload-line" disabled={isUploading} onClick={triggerFileInput}>
                {isUploading ? "Uploading..." : "Upload File"}
            </Button>
        </div>
    );
}

const useStyles = tss.create({
    root: {
        display: "flex",
        alignItems: "center",
        gap: fr.spacing("1w")
    },
    input: {
        display: "none"
    }
});
