import { API } from "@huddle01/server-sdk/api";
import { Recorder } from "@huddle01/server-sdk/recorder";

import { SERVER_ENV } from "./constants";

export const huddleAPI = new API({ apiKey: SERVER_ENV.HUDDLE_API_KEY });
export const huddleRecorder = new Recorder(SERVER_ENV.HUDDLE_PROJECT_ID, SERVER_ENV.HUDDLE_API_KEY);
