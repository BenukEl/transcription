import { memo } from "react";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import type { TranscriptionItem as TranscriptionItemType } from "../../api/generated/models";
import { declareComponentKeys, useTranslation } from "i18n";

type Props = {
    className?: string;
    transcription: TranscriptionItemType;
    onDelete: () => void;
};

export const TranscriptionItem = memo((props: Props) => {
    const { t } = useTranslation("Transcription");

    const { className, transcription, onDelete } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <div className={classes.textWrapper}>
                <span className={classes.text}>
                    {transcription.transcriptionText || "Processing..."}
                </span>
            </div>
            <div className={classes.buttonsWrapper}>
                <Button
                    iconId="ri-delete-bin-line"
                    onClick={onDelete}
                    priority="primary"
                    title={t("delete")}
                />
            </div>
        </div>
    );
});

const { i18n } = declareComponentKeys<"delete">()("Transcription");

export type I18n = typeof i18n;

const useStyles = tss.create({
    root: {
        backgroundColor: fr.colors.decisions.background.alt.blueFrance.default,
        "&:hover": {
            backgroundColor: fr.colors.decisions.background.alt.blueFrance.hover
        },
        display: "flex",
        alignItems: "center",
        padding: fr.spacing("2w")
    },
    textWrapper: {
        flex: 1
    },
    text: {},
    buttonsWrapper: {}
});
