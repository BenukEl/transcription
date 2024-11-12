import { useState } from "react";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
// import { Select } from "@codegouvfr/react-dsfr/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranscriptionApi } from "../../api/useTranscriptionApi";
import { TranscriptionItem } from "./TranscriptionItem";
import { usePartiallyAppliedEvent } from "../../tools/usePartiallyAppliedEvent";
import { declareComponentKeys, useTranslation } from "i18n";
import { FileUploader } from "./FileUploader";

export function TranscriptionApp() {
    const { t } = useTranslation("TranscriptionApp");

    const { classes } = useStyles();

    const [selectedTranscriber, setSelectedTranscriber] = useState<string>("default");

    const { transcriptions, transcribers, createTranscription, deleteTranscription, isPending } =
        useTranscriptionApi();

    const getOnDeleteTranscription = usePartiallyAppliedEvent(([transcriptionId]: [string]) => {
        deleteTranscription(transcriptionId);
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        createTranscription({ file, transcriber: selectedTranscriber });
    };

    return (
        <div className={classes.root}>
            {t("choose_a_model")}
            <div className={classes.uploadSection}>
                {/* <Select
                    label={t("choose_a_model")}
                    options={
                        transcribers?.map(transcriber => ({
                            label: transcriber.name,
                            value: transcriber.id
                        })) || []
                    }
                    selected={selectedTranscriber}
                    onChange={(event: { target: { value: SetStateAction<string> } }) =>
                        setSelectedTranscriber(event.target.value)
                    }
                    className={classes.select}
                /> */}
                <FileUploader onFileUpload={handleFileUpload} isUploading={isPending} />
            </div>
            {isPending && (
                <CircularProgress className={classes.circularProgress} size={fr.spacing("7v")} />
            )}
            <div className={classes.transcriptionListWrapper}>
                {transcriptions?.map(transcription => (
                    <TranscriptionItem
                        key={transcription.transcriptionId}
                        transcription={transcription}
                        onDelete={getOnDeleteTranscription(transcription.transcriptionId!)}
                    />
                ))}
            </div>
        </div>
    );
}

const { i18n } = declareComponentKeys<"choose_a_model">()("TranscriptionApp");

export type I18n = typeof i18n;

const useStyles = tss.create({
    root: {
        border: `1px solid ${fr.colors.decisions.border.actionLow.blueFrance.default}`,
        padding: fr.spacing("5w"),
        width: "100%",
        position: "relative"
    },
    uploadSection: {
        display: "flex",
        alignItems: "center",
        gap: fr.spacing("2w"),
        marginBottom: fr.spacing("4w")
    },
    select: {
        minWidth: "200px"
    },
    circularProgress: {
        position: "absolute",
        top: fr.spacing("2v"),
        right: fr.spacing("2v")
    },
    transcriptionListWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("2w")
    }
});
