import NavBar from "./components/NavBar"
import UrlShortenerForm from "./components/UrlShortenerForm";
import React, { useState } from "react";
import ShortenedUrlResult from "./components/ShortenedUrlResult";

const App: React.FC = () => {

    const [showResult, setShowResult] = useState(false);
    const [shortenedData, setShortenedData] = useState<{ longUrl: string; shortUrl: string } | undefined>(undefined);

    const handleUrlShorten = (longUrl: string, shortUrl: string) => {
        setShortenedData({ longUrl, shortUrl });
        setShowResult(true);
    };

 return (
    <>
        <NavBar/>

        {!showResult ? (
                <UrlShortenerForm onSubmit={handleUrlShorten} />
            ) : (
                <ShortenedUrlResult longUrl={shortenedData?.longUrl} shortUrl={shortenedData?.shortUrl} />
            )
        }
    </>
    
 );
}

export default App;
