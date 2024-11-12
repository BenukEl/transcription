import {
    useQuery,
    useMutation,
    useQueryClient,
    useIsMutating,
    useIsFetching
} from "@tanstack/react-query";
import transcriptionApi from "./transcriptionApi";
import type {
    CreateTranscriptionResponse,
    TranscriptionItem,
    TranscriberItem
} from "./generated/models";

const transcriptionsQueryKey = ["transcriptions"];
const transcribersQueryKey = ["transcribers"];

export function useTranscriptionApi() {
    const queryClient = useQueryClient();

    // Fetch all transcriptions
    const { data: transcriptions } = useQuery<TranscriptionItem[]>({
        queryKey: transcriptionsQueryKey,
        queryFn: async () => await transcriptionApi.getTranscriptions()
    });

    // Fetch available transcribers
    const { data: transcribers } = useQuery<TranscriberItem[]>({
        queryKey: transcribersQueryKey,
        queryFn: async () => await transcriptionApi.getTranscribers()
    });

    // Create a transcription
    const { mutate: createTranscription } = useMutation<
        CreateTranscriptionResponse,
        Error,
        { file: File; transcriber: string }
    >({
        mutationFn: async ({ file, transcriber }) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("transcriber", transcriber);
            return await transcriptionApi.createTranscription({ file, transcriber });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: transcriptionsQueryKey })
    });

    // Delete a transcription
    const { mutate: deleteTranscription } = useMutation<void, Error, string>({
        mutationFn: async (id: string) => {
            await transcriptionApi.deleteTranscription({ transcriptionId: id });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: transcriptionsQueryKey })
    });

    // Utility to track pending actions
    const mutationCount = useIsMutating();
    const fetchingCount = useIsFetching();

    return {
        transcriptions,
        transcribers,
        isPending: fetchingCount !== 0 || mutationCount !== 0,
        createTranscription,
        deleteTranscription
    };
}
