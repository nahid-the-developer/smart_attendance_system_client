import { useRef, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

const VideoStream = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const wsRef = useRef(null);
    const [processedFrameUrl, setProcessedFrameUrl] = useState(null);
    const { data } = useSession();
    const user = data?.user;
    const token = data?.accessToken;

    useEffect(() => {
        if (user && token) {
            const ws = new WebSocket(`ws://localhost:8000/ws/${user}/?token=${token}`);
            ws.binaryType = 'blob';

            ws.onopen = () => {
                console.log("WebSocket connection established");
            };

            ws.onmessage = (event) => {
                console.log("Message received from server");
                const blob = event.data;

                if (blob instanceof Blob) {
                    const newUrl = URL.createObjectURL(blob);

                    setProcessedFrameUrl((prevUrl) => {
                        if (prevUrl) {
                            URL.revokeObjectURL(prevUrl);
                        }
                        return newUrl;
                    });
                } else {
                    console.error("Received data is not a Blob:", blob);
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            ws.onclose = (event) => {
                console.log("WebSocket connection closed:", event);
            };

            wsRef.current = ws;
        }

        return () => {
            if (wsRef.current) {
                wsRef.current.onclose = () => {};
                wsRef.current.close();
            }
            if (processedFrameUrl) {
                URL.revokeObjectURL(processedFrameUrl);
            }
        };
    }, [user, token, processedFrameUrl]);

    useEffect(() => {
        const setupVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.onloadedmetadata = () => {
                        video.play().catch((error) => {
                            console.error("Error playing video:", error);
                        });
                    };
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
            }
        };

        setupVideoStream();
    }, []);

    const captureFrame = useCallback(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (!video || !canvas) return;

        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");

        if (context) {
            context.drawImage(video, 0, 0, width, height);
            canvas.toBlob((blob) => {
                const ws = wsRef.current;
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(blob);
                    console.log("Frame sent", blob);
                } else {
                    console.log("WebSocket is not open. ReadyState:", ws?.readyState);
                }
            }, "image/jpeg", 1.0);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(captureFrame, 1000);
        return () => clearInterval(interval);
    }, [captureFrame]);

    return (
        <div style={{ display: "flex", gap: "10px", flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ maxWidth: '50%', overflow: 'hidden' }}>
                <h1>Input Video</h1>
                <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
            </div>

            <div style={{ maxWidth: '50%', overflow: 'hidden' }}>
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <h1>Processed Video</h1>
                {processedFrameUrl && (
                    <img
                        src={processedFrameUrl}
                        alt="Processed frame"
                        style={{ width: '100%', height: 'auto' }}
                    />
                )}
            </div>
        </div>
    );
};

export default VideoStream;
