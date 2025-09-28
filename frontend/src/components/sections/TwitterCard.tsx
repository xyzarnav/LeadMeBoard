"use client";
import React from "react";

interface TwitterCardProps {
  username: string;
  name: string;
  tweet: string;
  organization: string;
}

const TwitterCard: React.FC<TwitterCardProps> = ({
  username,
  name,
  tweet,
  organization,
}) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 max-w-sm mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-500/30">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-green-500/30 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm sm:text-base truncate">{name}</h3>
          <p className="text-gray-400 text-xs sm:text-sm truncate">@{username}</p>
          <p className="text-green-400 text-xs truncate">{organization}</p>
        </div>
        <div className="text-green-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
      </div>

      {/* Tweet Content */}
      <div className="mb-4">
        <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
          "{tweet}"
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 2 8.478c0-3.064 2.525-5.754 5.67-5.754 2.536 0 4.33 1.667 5.33 3.752 1-2.085 2.792-3.752 5.33-3.752 3.164 0 5.67 2.69 5.67 5.754 0 6.376-7.454 13.11-10.037 13.157H12z"/>
            </svg>
            <span>2.3K</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.5 19.5a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0zM19.5 19.5a2.5 2.5 0 01-5 0 2.5 2.5 0 015 0zM3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 14.846 4.632 16 6.414 16H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z"/>
            </svg>
            <span>1.2K</span>
          </div>
        </div>
        <span className="text-green-400 font-medium">Verified</span>
      </div>
    </div>
  );
};

export default TwitterCard;
