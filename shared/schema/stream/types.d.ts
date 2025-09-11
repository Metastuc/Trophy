import { CREATED_STREAM_RESPONSE_SCHEMA, JOIN_STREAM_RESPONSE_SCHEMA, SCHEDULED_STREAM_RESPONSE_SCHEMA } from ".";

declare global {
    type CreatedStreamData = z.infer<typeof CREATED_STREAM_RESPONSE_SCHEMA>;
    type ScheduledStreamData = z.infer<typeof SCHEDULED_STREAM_RESPONSE_SCHEMA>;
    type JoinStreamData = z.infer<typeof JOIN_STREAM_RESPONSE_SCHEMA>;

    type CreatedStreamResponse = ApiResponse<CreatedStreamData>;
    type ScheduledStreamResponse = ApiResponse<ScheduledStreamData>;
    type JoinStreamResponse = ApiResponse<JoinStreamData>;
}

export {};
