import { createLazyFileRoute } from "@tanstack/react-router";
import { declareComponentKeys, useTranslation } from "i18n";
import { useOidc } from "oidc";
import { tss } from "tss";
import { fr } from "@codegouvfr/react-dsfr";

export const Route = createLazyFileRoute("/")({
    component: Page
});

function Page() {
    const { t } = useTranslation("DefaultPage");

    const { isUserLoggedIn, oidcTokens } = useOidc();

    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h3>
                    {t("welcome", {
                        name: isUserLoggedIn ? oidcTokens.decodedIdToken.preferred_username : undefined
                    })}
                </h3>
                <a href="https://github.com/InseeFrLab/vite-insee-starter" target="_blank">
                    InseeFrLab/vite-insee-starter
                </a>
            </div>
        </div>
    );
}

const useStyles = tss.create({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    content: {
        textAlign: "center"
    },
    myComponent: {
        margin: "auto",
        marginTop: fr.spacing("5w")
    }
});

const { i18n } = declareComponentKeys<
    | {
          K: "welcome";
          P: {
              name: string | undefined;
          };
          R: JSX.Element;
      }
    | "video aria label"
>()("DefaultPage");

export type I18n = typeof i18n;