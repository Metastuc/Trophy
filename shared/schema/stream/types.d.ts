import { CREATED_STREAM_RESPONSE_SCHEMA, SCHEDULED_STREAM_RESPONSE_SCHEMA } from ".";

declare global {
    type CreatedStreamData = z.infer<typeof CREATED_STREAM_RESPONSE_SCHEMA>;
    type ScheduledStreamData = z.infer<typeof SCHEDULED_STREAM_RESPONSE_SCHEMA>;

    type CreatedStreamResponse = ApiResponse<CreatedStreamData>;
    type ScheduledStreamResponse = ApiResponse<ScheduledStreamData>;
}

export {};
