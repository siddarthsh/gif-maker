/* eslint-disable @next/next/no-img-element */
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useEffect, useState } from 'react';
const ffmpeg = createFFmpeg();

export default function Home() {
    const [ready, setReady] = useState(false);
    const [video, setVideo]: any = useState();
    const [gif, setGif] = useState();

    const load = async () => {
        await ffmpeg.load();
        setReady(true);
    };

    useEffect(() => {
        load();
    }, []);

    const convertToGif = async () => {
        // Write the file to memory
        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

        // Run the FFMpeg command
        await ffmpeg.run(
            '-i',
            'test.mp4',
            '-t',
            '2.5',
            '-ss',
            '2.0',
            '-f',
            'gif',
            'out.gif'
        );

        // Read the result
        const data = ffmpeg.FS('readFile', 'out.gif');

        // Create a URL
        const url: any = URL.createObjectURL(
            new Blob([data.buffer], { type: 'image/gif' })
        );
        setGif(url);
    };

    return ready ? (
        <div className="App">
            {video && (
                <video
                    controls
                    width="250"
                    src={URL.createObjectURL(video)}
                ></video>
            )}

            <input
                type="file"
                onChange={(e) => setVideo(e.target.files?.item(0))}
            />

            <h3>Result</h3>

            <button onClick={convertToGif}>Convert</button>

            {gif && <img src={gif} width="250" alt="converted-image" />}
        </div>
    ) : (
        <p>Loading...</p>
    );
}
