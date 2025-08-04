import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';

export const InterviewPage: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const questions = [
    "Tell me about yourself and your background.",
    "What interests you most about this position?",
    "Describe a challenging project you've worked on.",
    "Where do you see yourself in 5 years?",
    "Do you have any questions for us?"
  ];

  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    return () => {
      // Cleanup
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Interview completed
      alert('Interview completed! Thank you for your time.');
    }
  };

  if (!isInterviewStarted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Interview</h1>
        
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-6">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            {!isVideoOn && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <VideoOff size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
            >
              {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
            
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
            >
              {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ready to start your interview?
            </h2>
            <p className="text-gray-600 mb-6">
              Make sure your camera and microphone are working properly. 
              The AI interviewer will ask you a series of questions.
            </p>
            
            <button
              onClick={startInterview}
              className="bg-accent text-black px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium text-lg"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">AI Interview in Progress</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Video</h3>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            {!isVideoOn && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <VideoOff size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={toggleVideo}
              className={`p-2 rounded-full ${isVideoOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full ${isAudioOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
            >
              {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
          </div>
        </div>

        {/* Interview Questions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">AI Interviewer</h3>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <p className="text-gray-800 text-lg">
                🤖 {questions[currentQuestion]}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Take your time to answer. Click "Next Question" when you're ready to continue.
              </p>
              
              <button
                onClick={nextQuestion}
                className="btn-primary"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};