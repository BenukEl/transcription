import { beforeLoadProtectedRoute } from "oidc";
import { createFileRoute } from "@tanstack/react-router";
import { tss, keyframes } from "tss";
import { declareComponentKeys } from "i18n";
import { TranscriptionApp } from "components/Transcription/TranscriptionApp";

export const Route = createFileRoute("/transcriptions")({
    component: Page,
    beforeLoad: beforeLoadProtectedRoute
});

function Page() {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <TranscriptionApp />
        </div>
    );
}

const { i18n } = declareComponentKeys<"waking up container">()("TodoPage");

export type I18n = typeof i18n;

const useStyles = tss.create({
    root: {
        display: "flex",
        justifyContent: "center",
        animation: `${keyframes({
            "0%": {
                opacity: 0
            },
            "100%": {
                opacity: 1
            }
        })} 0.2s forwards`
    }
});
