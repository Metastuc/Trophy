let stream, janus, pluginHandle, streamId;

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById("local-video").srcObject = stream;
        document.getElementById("start-camera").disabled = true;
    } catch (error) {
        alert("Error accessing camera: " + error.message);
    }
}

function startStream() {
    console.log(adapter.browserDetails.browser);
    return new Promise((resolve, reject) => {
        if (!window.adapter) {
            reject(new Error("webrtc-adapter not loaded"));
            return;
        }
        Janus.init({
            debug: "all",
            dependencies: Janus.useDefaultDependencies({
                adapter: window.adapter,
            }),
        });
        janus = new Janus({
            server: "wss://zcgw8oook4wsc4gc4k8s0og4.31.97.115.84.sslip.io:8088",
            success: () => {
                janus.attach({
                    plugin: "janus.plugin.videoroom",
                    success: (handle) => {
                        pluginHandle = handle;
                        pluginHandle.send({
                            message: {
                                request: "join",
                                room: 1234,
                                ptype: "publisher",
                                display: "bright",
                            },
                            success: () => {
                                pluginHandle.createOffer({
                                    stream,
                                    media: { audio: true, video: true },
                                    success: (jsep) => {
                                        const rtmpUrl = `rtmp://localhost/live/first01?yt_url=${encodeURIComponent(
                                            "",
                                        )}&x_url=${encodeURIComponent("rtmps://ca.pscp.tv:443/x/gw4t5gbe8245")}`;
                                        pluginHandle.send({
                                            message: {
                                                request: "configure",
                                                audio: true,
                                                video: true,
                                                rtmp: { url: rtmpUrl },
                                            },
                                            jsep,
                                            success: () => console.log("done"),
                                            error: reject,
                                        });
                                    },
                                    error: reject,
                                });
                            },
                            error: reject,
                        });
                    },
                    error: reject,
                    onlocalstream: (localStream) => {
                        // Optional: Update local video
                    },
                    onremotestream: () => {},
                    oncleanup: () => console.log("Stream cleaned up"),
                });
            },
            error: reject,
        });
    });
}

function stopStream() {
    if (pluginHandle) {
        pluginHandle.send({
            message: { request: "leave" },
            success: () => {
                pluginHandle.detach({
                    success: () => {
                        stream.getTracks().forEach((track) => track.stop());
                        document.getElementById("local-video").srcObject = null;
                        document.getElementById("stop-stream").disabled = true;
                        document.getElementById("start-camera").disabled = false;
                        document.getElementById("result").innerHTML = "<p>Stream stopped</p>";
                    },
                });
            },
        });
    }
}

document.getElementById("start-camera").addEventListener("click", startCamera);

document.getElementById("stream-btn").addEventListener("click", async (e) => {
    console.log("sttt");
    try {
        await startStream();
        document.getElementById("result").innerHTML = `
                <h3>Stream Started</h3>
                <p>Stream ID: ${1}</p>
                <p>Streaming to: X</p>
            `;
        document.getElementById("stop-stream").disabled = false;
    } catch (error) {
        console.error(error);
    }
});

document.getElementById("stop-stream").addEventListener("click", async () => {
    try {
        stopStream();
    } catch (error) {
        alert("Error stopping stream: " + error.message);
    }
});
