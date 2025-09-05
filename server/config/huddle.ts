import { API } from "@huddle01/server-sdk/api";
import { Recorder } from "@huddle01/server-sdk/recorder";

import { APP_SETTINGS } from "./settings";

export const huddleAPI = new API({ apiKey: APP_SETTINGS.HUDDLE_API_KEY });
export const huddleRecorder = new Recorder(APP_SETTINGS.HUDDLE_PROJECT_ID, APP_SETTINGS.HUDDLE_API_KEY);
