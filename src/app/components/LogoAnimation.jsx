import React from "react";
import { motion } from "framer-motion";

export default function LogoAnimation({ width, height }) {
  return (
    <div className="flex gap-8">
      <div className="flex items-end gap-1">
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 65.429 86.417"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#fff"
            strokeWidth="0.25mm"
            fill="#fff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.1 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.1 },
              }}
              d="M 0.008 62.085 A 26.502 26.502 0 0 0 0 62.751 Q 0 66.205 0.936 68.701 A 14.321 14.321 0 0 0 1.143 69.223 Q 3.326 74.437 8.907 75.872 A 18.989 18.989 0 0 0 13.632 76.416 A 39.021 39.021 0 0 0 27.401 73.877 A 33.988 33.988 0 0 0 33.724 70.776 A 28.247 28.247 0 0 0 33.911 70.658 A 25.47 25.47 0 0 0 38.998 66.431 A 19.961 19.961 0 0 0 42.611 60.913 A 16.362 16.362 0 0 0 43.336 58.923 A 18.4 18.4 0 0 0 44.051 54.224 A 12.717 12.717 0 0 0 44.056 53.882 A 11.906 11.906 0 0 0 42.172 47.437 A 11.766 11.766 0 0 0 39.417 44.408 A 15.104 15.104 0 0 0 36.239 42.529 A 45.504 45.504 0 0 0 39.466 40.782 A 37.863 37.863 0 0 0 49.716 31.982 Q 51.992 29.181 53.361 26.348 A 19.643 19.643 0 0 0 55.428 17.725 A 21.578 21.578 0 0 0 55.074 13.719 A 14.69 14.69 0 0 0 50.399 5.225 Q 47.665 2.832 43.148 1.416 A 33.364 33.364 0 0 0 41.321 0.899 A 28.616 28.616 0 0 0 34.31 0 A 148.826 148.826 0 0 0 33.919 0.001 Q 31.196 0.008 29.188 0.115 A 44.542 44.542 0 0 0 27.401 0.244 Q 18.657 1.171 12.611 3.506 A 28.285 28.285 0 0 0 6.503 6.689 Q 2.238 9.717 4.603 12.559 A 6.7 6.7 0 0 0 5.428 13.379 A 8.463 8.463 0 0 0 5.902 13.753 A 9.429 9.429 0 0 0 7.675 14.771 A 8.51 8.51 0 0 0 7.913 14.872 Q 9.046 15.332 10.018 15.332 A 2.804 2.804 0 0 0 10.743 15.232 Q 11.153 15.123 11.588 14.894 A 6.318 6.318 0 0 0 12.362 14.404 A 40.684 40.684 0 0 1 22.274 9.131 A 37.963 37.963 0 0 1 27.963 7.593 A 34.075 34.075 0 0 1 29.155 7.388 A 29.778 29.778 0 0 1 33.675 7.031 A 26.738 26.738 0 0 1 34.436 7.042 Q 36.716 7.107 38.436 7.568 A 12.115 12.115 0 0 1 40.435 8.303 Q 43.403 9.721 44.432 12.556 A 9.95 9.95 0 0 1 44.979 15.967 A 18.293 18.293 0 0 1 40.813 27.701 A 26.633 26.633 0 0 1 35.751 32.471 A 35.719 35.719 0 0 1 30.431 35.736 A 37.429 37.429 0 0 1 16.219 39.502 A 163.703 163.703 0 0 1 17.505 36.96 Q 19.506 33.084 21.951 28.825 A 294.65 294.65 0 0 1 27.499 19.58 A 1.431 1.431 0 0 0 27.749 18.771 Q 27.749 17.789 26.464 16.511 A 12.142 12.142 0 0 0 25.643 15.771 A 10.622 10.622 0 0 0 24.749 15.11 A 12.641 12.641 0 0 0 23.031 14.16 A 8.257 8.257 0 0 0 22.845 14.077 A 7.139 7.139 0 0 0 20.004 13.477 A 2.666 2.666 0 0 0 18.703 13.829 Q 18.251 14.078 17.81 14.504 A 7.132 7.132 0 0 0 17.05 15.381 A 82.814 82.814 0 0 0 11.847 23.433 A 95.612 95.612 0 0 0 4.159 41.016 A 103.055 103.055 0 0 0 2.565 46.335 A 80.08 80.08 0 0 0 1.107 52.734 Q 0.106 58.203 0.008 62.085 Z M 12.753 47.412 Q 9.042 56.641 8.846 63.477 A 11.899 11.899 0 0 0 8.841 63.826 Q 8.841 66.256 9.872 67.819 A 5.157 5.157 0 0 0 10.482 68.579 A 5.726 5.726 0 0 0 13.467 70.185 A 8.487 8.487 0 0 0 15.243 70.361 A 15.305 15.305 0 0 0 19.3 69.794 A 19.205 19.205 0 0 0 21.493 69.043 A 22.345 22.345 0 0 0 27.401 65.479 A 21.17 21.17 0 0 0 30.925 61.761 A 14.078 14.078 0 0 0 33.749 53.76 A 12.431 12.431 0 0 0 33.753 53.454 Q 33.753 48.507 29.714 46.276 A 11.053 11.053 0 0 0 28.378 45.654 A 13.697 13.697 0 0 0 25.315 44.884 A 15.543 15.543 0 0 0 24.813 44.824 A 16.577 16.577 0 0 0 23.289 44.968 Q 21.293 45.241 18.392 45.996 A 568.43 568.43 0 0 1 16.602 46.459 Q 14.542 46.988 13.38 47.266 A 53.356 53.356 0 0 1 12.753 47.412 Z"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 54.367 61.027"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#fff"
            strokeWidth="0.25mm"
            fill="#fff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.2 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.2 },
              }}
              d="M 1.996 43.953 A 12.721 12.721 0 0 0 4.446 47.218 A 12.737 12.737 0 0 0 9.304 50.099 A 17.694 17.694 0 0 0 12.407 50.809 A 23.77 23.77 0 0 0 15.7 51.027 A 18.105 18.105 0 0 0 18.409 50.821 A 21.072 21.072 0 0 0 23 49.562 A 28.097 28.097 0 0 0 29.281 46.075 A 33.01 33.01 0 0 0 35.793 39.65 Q 41.262 32.667 43.313 24.318 Q 44.702 18.7 44.26 14.109 A 19.194 19.194 0 0 0 43.02 8.839 A 18.45 18.45 0 0 0 42.565 7.804 Q 38.848 0.001 29.397 0.001 A 21.796 21.796 0 0 0 20.712 1.829 A 28.669 28.669 0 0 0 14.602 5.47 Q 11.33 8.009 8.62 11.427 A 40.907 40.907 0 0 0 3.982 18.751 A 40.379 40.379 0 0 0 1.003 26.857 A 34.488 34.488 0 0 0 0.999 26.873 Q -0.047 31.064 0.002 35.158 Q 0.027 37.209 0.332 38.985 A 16.848 16.848 0 0 0 1.223 42.262 A 15.872 15.872 0 0 0 1.996 43.953 Z M 13.772 23.537 A 47.256 47.256 0 0 0 11.452 30.959 Q 10.598 34.767 10.647 38.161 Q 10.678 40.369 11.114 41.958 A 7.754 7.754 0 0 0 11.697 43.483 Q 12.571 45.168 14.397 45.381 A 4.726 4.726 0 0 0 14.944 45.412 Q 17.19 45.412 19.363 43.874 A 18.584 18.584 0 0 0 21.637 41.957 A 25.319 25.319 0 0 0 23.586 39.796 A 35.658 35.658 0 0 0 25.995 36.412 A 44.513 44.513 0 0 0 27.444 33.937 A 55.812 55.812 0 0 0 30.617 27.003 A 52.451 52.451 0 0 0 32.375 21.526 Q 33.56 16.926 33.498 13.039 A 20.343 20.343 0 0 0 33.385 10.805 Q 33 7.336 31.301 6.203 Q 30.65 5.769 29.612 5.656 A 7.213 7.213 0 0 0 28.835 5.617 A 4.323 4.323 0 0 0 27.526 5.836 Q 26.448 6.179 25.197 7.057 A 18.197 18.197 0 0 0 23.211 8.687 Q 22.286 9.556 21.36 10.628 A 30.856 30.856 0 0 0 21.096 10.939 A 36.362 36.362 0 0 0 18.835 13.948 A 47.073 47.073 0 0 0 17.141 16.652 A 53.969 53.969 0 0 0 13.772 23.537 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 54.367 61.027"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#fff"
            strokeWidth="0.25mm"
            fill="#fff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.3 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.3 },
              }}
              d="M 1.996 43.953 A 12.721 12.721 0 0 0 4.446 47.218 A 12.737 12.737 0 0 0 9.304 50.099 A 17.694 17.694 0 0 0 12.407 50.809 A 23.77 23.77 0 0 0 15.7 51.027 A 18.105 18.105 0 0 0 18.409 50.821 A 21.072 21.072 0 0 0 23 49.562 A 28.097 28.097 0 0 0 29.281 46.075 A 33.01 33.01 0 0 0 35.793 39.65 Q 41.262 32.667 43.313 24.318 Q 44.702 18.7 44.26 14.109 A 19.194 19.194 0 0 0 43.02 8.839 A 18.45 18.45 0 0 0 42.565 7.804 Q 38.848 0.001 29.397 0.001 A 21.796 21.796 0 0 0 20.712 1.829 A 28.669 28.669 0 0 0 14.602 5.47 Q 11.33 8.009 8.62 11.427 A 40.907 40.907 0 0 0 3.982 18.751 A 40.379 40.379 0 0 0 1.003 26.857 A 34.488 34.488 0 0 0 0.999 26.873 Q -0.047 31.064 0.002 35.158 Q 0.027 37.209 0.332 38.985 A 16.848 16.848 0 0 0 1.223 42.262 A 15.872 15.872 0 0 0 1.996 43.953 Z M 13.772 23.537 A 47.256 47.256 0 0 0 11.452 30.959 Q 10.598 34.767 10.647 38.161 Q 10.678 40.369 11.114 41.958 A 7.754 7.754 0 0 0 11.697 43.483 Q 12.571 45.168 14.397 45.381 A 4.726 4.726 0 0 0 14.944 45.412 Q 17.19 45.412 19.363 43.874 A 18.584 18.584 0 0 0 21.637 41.957 A 25.319 25.319 0 0 0 23.586 39.796 A 35.658 35.658 0 0 0 25.995 36.412 A 44.513 44.513 0 0 0 27.444 33.937 A 55.812 55.812 0 0 0 30.617 27.003 A 52.451 52.451 0 0 0 32.375 21.526 Q 33.56 16.926 33.498 13.039 A 20.343 20.343 0 0 0 33.385 10.805 Q 33 7.336 31.301 6.203 Q 30.65 5.769 29.612 5.656 A 7.213 7.213 0 0 0 28.835 5.617 A 4.323 4.323 0 0 0 27.526 5.836 Q 26.448 6.179 25.197 7.057 A 18.197 18.197 0 0 0 23.211 8.687 Q 22.286 9.556 21.36 10.628 A 30.856 30.856 0 0 0 21.096 10.939 A 36.362 36.362 0 0 0 18.835 13.948 A 47.073 47.073 0 0 0 17.141 16.652 A 53.969 53.969 0 0 0 13.772 23.537 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 60.489 92.813"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#ffffff"
            strokeWidth="0.25mm"
            fill="#ffffff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.4 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.4 },
              }}
              d="M 13.916 70.41 L 10.986 77.051 A 41.885 41.885 0 0 1 10.21 78.641 Q 9.373 80.258 8.618 81.299 A 4.953 4.953 0 0 1 7.961 82.048 Q 7.533 82.439 7.069 82.63 A 2.382 2.382 0 0 1 6.152 82.813 A 6.982 6.982 0 0 1 4.62 82.65 A 5.873 5.873 0 0 1 3.662 82.349 A 7.226 7.226 0 0 1 2.256 81.584 A 6.346 6.346 0 0 1 1.709 81.153 Q 0 79.59 0 77.735 A 1.95 1.95 0 0 1 0.054 77.322 Q 0.206 76.644 0.777 75.387 A 31.099 31.099 0 0 1 1.025 74.854 L 2.979 70.899 Q 12.109 52.1 19.531 23.242 A 223.103 223.103 0 0 0 21.634 14.34 Q 22.581 9.904 23.212 5.918 A 128.951 128.951 0 0 0 23.486 4.102 Q 24.023 0 27.49 0 A 6.456 6.456 0 0 1 29.085 0.188 A 4.848 4.848 0 0 1 30.908 1.074 A 9.169 9.169 0 0 1 32.166 2.27 Q 33.518 3.848 33.447 5.591 A 31.903 31.903 0 0 1 33.254 7.991 Q 33.107 9.248 32.861 10.636 A 53.781 53.781 0 0 1 32.788 11.035 A 85.255 85.255 0 0 1 32.135 14.203 A 112.587 112.587 0 0 1 31.299 17.652 A 195.387 195.387 0 0 1 29.774 23.198 A 225.207 225.207 0 0 1 29.199 25.147 A 907.742 907.742 0 0 1 27.713 29.883 Q 25.635 36.438 24.463 39.697 L 19.873 52.344 A 116.699 116.699 0 0 1 19.458 53.391 Q 18.901 54.774 18.543 55.537 A 15.954 15.954 0 0 1 18.506 55.615 A 76.223 76.223 0 0 0 25.478 52.465 Q 31.737 49.22 35.498 45.459 A 17.541 17.541 0 0 0 37.112 43.623 Q 38.842 41.325 38.913 39.241 A 5.228 5.228 0 0 0 38.916 39.063 A 3.595 3.595 0 0 0 38.823 38.217 A 2.198 2.198 0 0 0 37.915 36.865 Q 36.914 36.182 36.548 35.816 Q 36.183 35.45 36.498 34.502 A 4.091 4.091 0 0 1 36.499 34.497 Q 36.816 33.545 38.33 32.666 A 6.318 6.318 0 0 1 40.322 31.938 A 8.811 8.811 0 0 1 41.992 31.787 A 19.563 19.563 0 0 1 43.497 31.842 Q 44.216 31.897 44.833 32.01 A 9.136 9.136 0 0 1 45.581 32.178 A 7.477 7.477 0 0 1 47.312 32.879 A 6.559 6.559 0 0 1 48.096 33.399 Q 50.488 35.108 50.488 38.233 A 12.889 12.889 0 0 1 49.777 42.546 A 12.025 12.025 0 0 1 49.17 43.97 A 14.348 14.348 0 0 1 47.485 46.539 Q 46.588 47.645 45.411 48.718 A 24.429 24.429 0 0 1 45.068 49.024 Q 40.084 53.258 29.681 57.253 A 123.087 123.087 0 0 1 27.393 58.106 Q 28.906 64.6 32.959 69.531 A 23.125 23.125 0 0 0 34.79 71.527 Q 36.862 73.515 38.736 74.035 A 4.858 4.858 0 0 0 40.039 74.219 A 8.354 8.354 0 0 0 41.394 74.115 Q 42.263 73.972 42.969 73.633 L 44.727 72.754 Q 45.264 72.461 45.752 72.461 A 1.439 1.439 0 0 1 46.279 72.55 Q 46.906 72.796 46.966 73.722 A 3.153 3.153 0 0 1 46.973 73.926 A 6.2 6.2 0 0 1 46.877 75.042 A 4.604 4.604 0 0 1 46.533 76.148 Q 46.13 77.021 45.419 77.997 A 15.933 15.933 0 0 1 45.288 78.174 A 10.442 10.442 0 0 1 44.301 79.302 A 14.028 14.028 0 0 1 43.213 80.274 Q 40.039 82.764 35.889 82.764 Q 26.239 82.764 19.994 66.813 A 77.697 77.697 0 0 1 18.213 61.719 Q 15.625 66.504 13.916 70.41 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
      </div>
      <div className="flex items-end gap-1">
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 65.429 86.417"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#fff"
            strokeWidth="0.25mm"
            fill="#fff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.6 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.6 },
              }}
              d="M 0.008 62.085 A 26.502 26.502 0 0 0 0 62.751 Q 0 66.205 0.936 68.701 A 14.321 14.321 0 0 0 1.143 69.223 Q 3.326 74.437 8.907 75.872 A 18.989 18.989 0 0 0 13.632 76.416 A 39.021 39.021 0 0 0 27.401 73.877 A 33.988 33.988 0 0 0 33.724 70.776 A 28.247 28.247 0 0 0 33.911 70.658 A 25.47 25.47 0 0 0 38.998 66.431 A 19.961 19.961 0 0 0 42.611 60.913 A 16.362 16.362 0 0 0 43.336 58.923 A 18.4 18.4 0 0 0 44.051 54.224 A 12.717 12.717 0 0 0 44.056 53.882 A 11.906 11.906 0 0 0 42.172 47.437 A 11.766 11.766 0 0 0 39.417 44.408 A 15.104 15.104 0 0 0 36.239 42.529 A 45.504 45.504 0 0 0 39.466 40.782 A 37.863 37.863 0 0 0 49.716 31.982 Q 51.992 29.181 53.361 26.348 A 19.643 19.643 0 0 0 55.428 17.725 A 21.578 21.578 0 0 0 55.074 13.719 A 14.69 14.69 0 0 0 50.399 5.225 Q 47.665 2.832 43.148 1.416 A 33.364 33.364 0 0 0 41.321 0.899 A 28.616 28.616 0 0 0 34.31 0 A 148.826 148.826 0 0 0 33.919 0.001 Q 31.196 0.008 29.188 0.115 A 44.542 44.542 0 0 0 27.401 0.244 Q 18.657 1.171 12.611 3.506 A 28.285 28.285 0 0 0 6.503 6.689 Q 2.238 9.717 4.603 12.559 A 6.7 6.7 0 0 0 5.428 13.379 A 8.463 8.463 0 0 0 5.902 13.753 A 9.429 9.429 0 0 0 7.675 14.771 A 8.51 8.51 0 0 0 7.913 14.872 Q 9.046 15.332 10.018 15.332 A 2.804 2.804 0 0 0 10.743 15.232 Q 11.153 15.123 11.588 14.894 A 6.318 6.318 0 0 0 12.362 14.404 A 40.684 40.684 0 0 1 22.274 9.131 A 37.963 37.963 0 0 1 27.963 7.593 A 34.075 34.075 0 0 1 29.155 7.388 A 29.778 29.778 0 0 1 33.675 7.031 A 26.738 26.738 0 0 1 34.436 7.042 Q 36.716 7.107 38.436 7.568 A 12.115 12.115 0 0 1 40.435 8.303 Q 43.403 9.721 44.432 12.556 A 9.95 9.95 0 0 1 44.979 15.967 A 18.293 18.293 0 0 1 40.813 27.701 A 26.633 26.633 0 0 1 35.751 32.471 A 35.719 35.719 0 0 1 30.431 35.736 A 37.429 37.429 0 0 1 16.219 39.502 A 163.703 163.703 0 0 1 17.505 36.96 Q 19.506 33.084 21.951 28.825 A 294.65 294.65 0 0 1 27.499 19.58 A 1.431 1.431 0 0 0 27.749 18.771 Q 27.749 17.789 26.464 16.511 A 12.142 12.142 0 0 0 25.643 15.771 A 10.622 10.622 0 0 0 24.749 15.11 A 12.641 12.641 0 0 0 23.031 14.16 A 8.257 8.257 0 0 0 22.845 14.077 A 7.139 7.139 0 0 0 20.004 13.477 A 2.666 2.666 0 0 0 18.703 13.829 Q 18.251 14.078 17.81 14.504 A 7.132 7.132 0 0 0 17.05 15.381 A 82.814 82.814 0 0 0 11.847 23.433 A 95.612 95.612 0 0 0 4.159 41.016 A 103.055 103.055 0 0 0 2.565 46.335 A 80.08 80.08 0 0 0 1.107 52.734 Q 0.106 58.203 0.008 62.085 Z M 12.753 47.412 Q 9.042 56.641 8.846 63.477 A 11.899 11.899 0 0 0 8.841 63.826 Q 8.841 66.256 9.872 67.819 A 5.157 5.157 0 0 0 10.482 68.579 A 5.726 5.726 0 0 0 13.467 70.185 A 8.487 8.487 0 0 0 15.243 70.361 A 15.305 15.305 0 0 0 19.3 69.794 A 19.205 19.205 0 0 0 21.493 69.043 A 22.345 22.345 0 0 0 27.401 65.479 A 21.17 21.17 0 0 0 30.925 61.761 A 14.078 14.078 0 0 0 33.749 53.76 A 12.431 12.431 0 0 0 33.753 53.454 Q 33.753 48.507 29.714 46.276 A 11.053 11.053 0 0 0 28.378 45.654 A 13.697 13.697 0 0 0 25.315 44.884 A 15.543 15.543 0 0 0 24.813 44.824 A 16.577 16.577 0 0 0 23.289 44.968 Q 21.293 45.241 18.392 45.996 A 568.43 568.43 0 0 1 16.602 46.459 Q 14.542 46.988 13.38 47.266 A 53.356 53.356 0 0 1 12.753 47.412 Z"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 62.439 61.026"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#ffffff"
            strokeWidth="0.25mm"
            fill="#ffffff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.7 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.7 },
              }}
              d="M 4.981 26.416 L 7.617 20.557 A 120.622 120.622 0 0 0 8.987 17.402 Q 12.499 8.965 11.377 7.178 A 3.643 3.643 0 0 0 10.853 6.54 Q 10.283 5.977 9.335 5.413 A 13.044 13.044 0 0 0 9.18 5.322 A 1.125 1.125 0 0 1 8.643 4.577 A 1.936 1.936 0 0 1 8.594 4.126 A 2.148 2.148 0 0 1 8.884 3.061 A 3.157 3.157 0 0 1 9.302 2.49 A 5.753 5.753 0 0 1 10.23 1.673 A 7.639 7.639 0 0 1 11.133 1.123 A 11.892 11.892 0 0 1 14.086 0.165 A 10.338 10.338 0 0 1 15.918 0 Q 18.039 0 19.259 0.403 A 4.441 4.441 0 0 1 19.556 0.513 A 7.232 7.232 0 0 1 20.621 1.052 A 5.328 5.328 0 0 1 21.582 1.807 A 6.094 6.094 0 0 1 22.587 3.104 A 4.528 4.528 0 0 1 23.193 5.371 A 14.255 14.255 0 0 1 23.054 7.304 Q 22.921 8.277 22.66 9.343 A 24.421 24.421 0 0 1 22.559 9.741 A 53.123 53.123 0 0 1 21.826 12.262 A 70.284 70.284 0 0 1 20.899 14.99 Q 19.873 17.822 18.652 20.85 Q 15.9 27.311 14.614 30.189 A 102.349 102.349 0 0 1 14.111 31.299 L 12.305 35.059 A 38.825 38.825 0 0 0 11.715 36.437 Q 10.791 38.727 10.791 39.795 Q 10.791 41.162 11.231 41.724 Q 11.67 42.285 12.817 42.285 A 3.052 3.052 0 0 0 13.73 42.134 Q 14.507 41.89 15.42 41.253 A 10.216 10.216 0 0 0 15.479 41.211 Q 16.655 40.376 18.009 39.098 A 38.16 38.16 0 0 0 18.799 38.33 A 51.388 51.388 0 0 0 20.642 36.383 A 67.667 67.667 0 0 0 22.559 34.155 A 106.066 106.066 0 0 0 26.367 29.248 Q 29.386 25.143 31.077 22.365 A 39.654 39.654 0 0 0 31.738 21.24 Q 42.09 2.93 42.774 2.1 A 8.135 8.135 0 0 1 43.596 1.144 Q 44.053 0.697 44.515 0.425 A 2.843 2.843 0 0 1 45.972 0 Q 47.607 0 48.828 0.366 A 6.982 6.982 0 0 1 50.093 0.879 A 5.705 5.705 0 0 1 50.928 1.416 A 6.151 6.151 0 0 1 51.584 1.969 Q 52.845 3.206 52.246 4.443 Q 40.411 29.132 39.417 35.608 A 10.474 10.474 0 0 0 39.404 35.693 A 84.696 84.696 0 0 0 39.303 36.648 Q 39.185 37.833 39.165 38.473 A 7.722 7.722 0 0 0 39.16 38.721 Q 39.16 42.432 41.406 42.432 A 9.589 9.589 0 0 0 42.878 42.325 Q 43.662 42.203 44.311 41.942 A 5.088 5.088 0 0 0 44.873 41.675 A 16.698 16.698 0 0 1 45.355 41.418 Q 46.332 40.918 46.729 40.918 A 1.617 1.617 0 0 1 47.173 40.974 Q 47.671 41.116 47.804 41.625 A 1.655 1.655 0 0 1 47.852 42.041 A 7.79 7.79 0 0 1 45.44 47.694 A 12.304 12.304 0 0 1 43.652 49.17 A 11.344 11.344 0 0 1 38.631 50.937 A 14.43 14.43 0 0 1 37.012 51.025 A 10.718 10.718 0 0 1 35.202 50.882 Q 33.368 50.568 32.227 49.561 Q 29.248 46.924 29.248 43.115 A 17.325 17.325 0 0 1 29.534 40.185 Q 30.065 37.128 31.583 32.823 A 101.96 101.96 0 0 1 33.301 28.32 A 568.905 568.905 0 0 1 30.023 32.707 Q 25.072 39.261 22.754 41.821 A 79.899 79.899 0 0 1 20.765 43.945 Q 19.86 44.874 19.039 45.644 A 33.552 33.552 0 0 1 17.481 47.022 Q 12.598 51.025 8.643 51.025 A 10.684 10.684 0 0 1 5.486 50.59 Q 2.18 49.57 0.73 46.158 A 10.73 10.73 0 0 1 0.586 45.801 A 9.486 9.486 0 0 1 0.112 43.841 A 12.735 12.735 0 0 1 0 42.114 A 14.42 14.42 0 0 1 0.156 40.062 Q 0.332 38.837 0.708 37.476 A 46.402 46.402 0 0 1 1.755 34.185 A 55.634 55.634 0 0 1 2.539 32.129 Q 3.662 29.346 4.981 26.416 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 70.791 92.814"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#ffffff"
            strokeWidth="0.25mm"
            fill="#ffffff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.8 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.8 },
              }}
              d="M 45.557 46.582 L 42.871 55.616 A 279.693 279.693 0 0 0 41.693 59.829 Q 39.932 66.338 39.526 69.412 A 12.109 12.109 0 0 0 39.404 70.948 A 6.59 6.59 0 0 0 39.499 72.121 Q 39.881 74.219 41.797 74.219 Q 43.291 74.219 44.378 73.948 A 5.676 5.676 0 0 0 45.313 73.633 L 47.168 72.754 Q 47.705 72.461 48.193 72.461 A 1.405 1.405 0 0 1 48.605 72.516 Q 49.058 72.655 49.177 73.145 A 1.664 1.664 0 0 1 49.219 73.535 A 7.699 7.699 0 0 1 47.176 78.742 Q 46.269 79.777 44.958 80.702 A 16.15 16.15 0 0 1 44.873 80.762 A 13.646 13.646 0 0 1 42.93 81.93 Q 41.822 82.468 40.764 82.678 A 6.837 6.837 0 0 1 39.429 82.813 A 18.236 18.236 0 0 1 37.859 82.75 Q 37.114 82.685 36.487 82.554 A 7.246 7.246 0 0 1 35.352 82.227 A 7.42 7.42 0 0 1 32.966 80.715 A 8.757 8.757 0 0 1 32.617 80.371 A 9.732 9.732 0 0 1 30.334 76.118 Q 29.883 74.398 29.883 72.315 A 8.151 8.151 0 0 1 29.907 71.726 Q 29.956 71.055 30.105 70.075 A 47.762 47.762 0 0 1 30.273 69.043 A 83.056 83.056 0 0 1 28.138 72.191 Q 26.135 74.99 24.472 76.695 A 17.807 17.807 0 0 1 23.486 77.637 A 25.956 25.956 0 0 1 19.94 80.366 Q 17.836 81.695 15.765 82.302 A 12.25 12.25 0 0 1 12.305 82.813 Q 3.662 82.813 0.977 75 Q 0.218 72.763 0.049 69.642 A 34.5 34.5 0 0 1 0 67.774 A 30.533 30.533 0 0 1 1.12 59.678 A 34.352 34.352 0 0 1 1.318 58.985 A 40.313 40.313 0 0 1 4.907 50.537 A 45.253 45.253 0 0 1 10.181 43.091 A 44.886 44.886 0 0 1 14.864 38.436 A 39.463 39.463 0 0 1 16.504 37.11 A 36.764 36.764 0 0 1 20.721 34.36 Q 22.909 33.154 24.951 32.514 A 14.83 14.83 0 0 1 29.395 31.787 A 11.368 11.368 0 0 1 34.365 32.852 Q 36.808 34.021 38.623 36.475 A 546.871 546.871 0 0 1 41.661 26.401 Q 47.925 6.394 51.416 2.149 Q 52.596 0.746 53.859 0.259 A 3.769 3.769 0 0 1 55.225 0 A 9.233 9.233 0 0 1 57.186 0.196 Q 59.092 0.61 60.254 1.905 Q 60.681 2.409 60.768 2.914 A 1.52 1.52 0 0 1 60.791 3.174 A 1.804 1.804 0 0 1 60.748 3.531 Q 60.631 4.098 60.194 5.104 A 23.393 23.393 0 0 1 60.01 5.518 A 51.365 51.365 0 0 0 59.573 6.504 Q 58.85 8.179 57.715 11.035 Q 53.369 22.51 51.611 27.832 Q 47.119 41.455 45.557 46.582 Z M 25.989 65.949 A 64.988 64.988 0 0 0 26.172 65.674 A 65.156 65.156 0 0 0 35.645 43.555 A 7.025 7.025 0 0 0 35.203 41.417 A 5.444 5.444 0 0 0 32.861 38.672 A 2.987 2.987 0 0 0 32.15 38.366 Q 31.37 38.135 30.2 38.135 A 6.09 6.09 0 0 0 28.718 38.332 Q 28.029 38.506 27.271 38.831 A 14.375 14.375 0 0 0 26.05 39.429 A 19.022 19.022 0 0 0 23.147 41.399 A 23.86 23.86 0 0 0 21.46 42.92 A 29.412 29.412 0 0 0 18.575 46.257 A 35.441 35.441 0 0 0 17.31 48.072 A 40.541 40.541 0 0 0 13.965 54.346 A 39.143 39.143 0 0 0 11.436 62.612 A 32.732 32.732 0 0 0 10.889 68.531 A 19.244 19.244 0 0 0 11.02 70.89 Q 11.592 75.489 14.648 75.489 Q 19.607 75.489 25.989 65.949 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 70.791 92.814"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#ffffff"
            strokeWidth="0.25mm"
            fill="#ffffff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 0.9 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 0.9 },
              }}
              d="M 45.557 46.582 L 42.871 55.616 A 279.693 279.693 0 0 0 41.693 59.829 Q 39.932 66.338 39.526 69.412 A 12.109 12.109 0 0 0 39.404 70.948 A 6.59 6.59 0 0 0 39.499 72.121 Q 39.881 74.219 41.797 74.219 Q 43.291 74.219 44.378 73.948 A 5.676 5.676 0 0 0 45.313 73.633 L 47.168 72.754 Q 47.705 72.461 48.193 72.461 A 1.405 1.405 0 0 1 48.605 72.516 Q 49.058 72.655 49.177 73.145 A 1.664 1.664 0 0 1 49.219 73.535 A 7.699 7.699 0 0 1 47.176 78.742 Q 46.269 79.777 44.958 80.702 A 16.15 16.15 0 0 1 44.873 80.762 A 13.646 13.646 0 0 1 42.93 81.93 Q 41.822 82.468 40.764 82.678 A 6.837 6.837 0 0 1 39.429 82.813 A 18.236 18.236 0 0 1 37.859 82.75 Q 37.114 82.685 36.487 82.554 A 7.246 7.246 0 0 1 35.352 82.227 A 7.42 7.42 0 0 1 32.966 80.715 A 8.757 8.757 0 0 1 32.617 80.371 A 9.732 9.732 0 0 1 30.334 76.118 Q 29.883 74.398 29.883 72.315 A 8.151 8.151 0 0 1 29.907 71.726 Q 29.956 71.055 30.105 70.075 A 47.762 47.762 0 0 1 30.273 69.043 A 83.056 83.056 0 0 1 28.138 72.191 Q 26.135 74.99 24.472 76.695 A 17.807 17.807 0 0 1 23.486 77.637 A 25.956 25.956 0 0 1 19.94 80.366 Q 17.836 81.695 15.765 82.302 A 12.25 12.25 0 0 1 12.305 82.813 Q 3.662 82.813 0.977 75 Q 0.218 72.763 0.049 69.642 A 34.5 34.5 0 0 1 0 67.774 A 30.533 30.533 0 0 1 1.12 59.678 A 34.352 34.352 0 0 1 1.318 58.985 A 40.313 40.313 0 0 1 4.907 50.537 A 45.253 45.253 0 0 1 10.181 43.091 A 44.886 44.886 0 0 1 14.864 38.436 A 39.463 39.463 0 0 1 16.504 37.11 A 36.764 36.764 0 0 1 20.721 34.36 Q 22.909 33.154 24.951 32.514 A 14.83 14.83 0 0 1 29.395 31.787 A 11.368 11.368 0 0 1 34.365 32.852 Q 36.808 34.021 38.623 36.475 A 546.871 546.871 0 0 1 41.661 26.401 Q 47.925 6.394 51.416 2.149 Q 52.596 0.746 53.859 0.259 A 3.769 3.769 0 0 1 55.225 0 A 9.233 9.233 0 0 1 57.186 0.196 Q 59.092 0.61 60.254 1.905 Q 60.681 2.409 60.768 2.914 A 1.52 1.52 0 0 1 60.791 3.174 A 1.804 1.804 0 0 1 60.748 3.531 Q 60.631 4.098 60.194 5.104 A 23.393 23.393 0 0 1 60.01 5.518 A 51.365 51.365 0 0 0 59.573 6.504 Q 58.85 8.179 57.715 11.035 Q 53.369 22.51 51.611 27.832 Q 47.119 41.455 45.557 46.582 Z M 25.989 65.949 A 64.988 64.988 0 0 0 26.172 65.674 A 65.156 65.156 0 0 0 35.645 43.555 A 7.025 7.025 0 0 0 35.203 41.417 A 5.444 5.444 0 0 0 32.861 38.672 A 2.987 2.987 0 0 0 32.15 38.366 Q 31.37 38.135 30.2 38.135 A 6.09 6.09 0 0 0 28.718 38.332 Q 28.029 38.506 27.271 38.831 A 14.375 14.375 0 0 0 26.05 39.429 A 19.022 19.022 0 0 0 23.147 41.399 A 23.86 23.86 0 0 0 21.46 42.92 A 29.412 29.412 0 0 0 18.575 46.257 A 35.441 35.441 0 0 0 17.31 48.072 A 40.541 40.541 0 0 0 13.965 54.346 A 39.143 39.143 0 0 0 11.436 62.612 A 32.732 32.732 0 0 0 10.889 68.531 A 19.244 19.244 0 0 0 11.02 70.89 Q 11.592 75.489 14.648 75.489 Q 19.607 75.489 25.989 65.949 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
        <motion.svg
          width={width}
          height={height}
          viewBox="-5 -5 62.335 87.428"
          xmlns="http://www.w3.org/2000/svg"
          className="translate-y-2"
        >
          <g
            id="svgGroup"
            strokeLinecap="round"
            fillRule="evenodd"
            fontSize="9pt"
            stroke="#ffffff"
            strokeWidth="0.25mm"
            fill="#ffffff"
            style={{ stroke: "#fff", strokeWidth: "0.25mm", fill: "none" }}
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut", delay: 1 },
                opacity: { duration: 0.2, ease: "easeInOut", delay: 1 },
              }}
              d="M 4.981 26.416 L 7.617 20.557 A 120.622 120.622 0 0 0 8.987 17.402 Q 12.499 8.965 11.377 7.178 A 3.643 3.643 0 0 0 10.853 6.54 Q 10.283 5.977 9.335 5.413 A 13.044 13.044 0 0 0 9.18 5.322 A 1.125 1.125 0 0 1 8.643 4.577 A 1.936 1.936 0 0 1 8.594 4.126 A 2.148 2.148 0 0 1 8.884 3.061 A 3.157 3.157 0 0 1 9.302 2.49 A 5.753 5.753 0 0 1 10.23 1.673 A 7.639 7.639 0 0 1 11.133 1.123 A 11.892 11.892 0 0 1 14.086 0.165 A 10.338 10.338 0 0 1 15.918 0 Q 18.039 0 19.259 0.403 A 4.441 4.441 0 0 1 19.556 0.513 A 7.232 7.232 0 0 1 20.621 1.052 A 5.328 5.328 0 0 1 21.582 1.807 A 6.094 6.094 0 0 1 22.587 3.104 A 4.528 4.528 0 0 1 23.193 5.371 A 14.255 14.255 0 0 1 23.054 7.304 Q 22.921 8.277 22.66 9.343 A 24.421 24.421 0 0 1 22.559 9.741 A 53.123 53.123 0 0 1 21.826 12.262 A 70.284 70.284 0 0 1 20.899 14.99 Q 19.873 17.822 18.652 20.85 Q 15.9 27.311 14.614 30.189 A 102.349 102.349 0 0 1 14.111 31.299 L 12.305 35.059 A 38.825 38.825 0 0 0 11.715 36.437 Q 10.791 38.727 10.791 39.795 Q 10.791 41.162 11.231 41.724 Q 11.67 42.285 12.817 42.285 Q 13.723 42.285 14.78 41.738 A 7.761 7.761 0 0 0 15.357 41.406 A 17.422 17.422 0 0 0 16.616 40.525 Q 17.244 40.046 17.911 39.463 A 31.435 31.435 0 0 0 18.359 39.063 A 41.629 41.629 0 0 0 20.001 37.482 A 54.096 54.096 0 0 0 21.704 35.669 A 83.52 83.52 0 0 0 25.098 31.641 Q 27.95 28.116 29.834 25.243 A 40.501 40.501 0 0 0 31.543 22.412 A 5861.03 5861.03 0 0 1 34.025 17.844 Q 41.279 4.506 42.512 2.438 A 5.578 5.578 0 0 1 42.725 2.1 A 8.421 8.421 0 0 1 43.57 1.144 Q 44.764 0 45.972 0 Q 47.607 0 48.828 0.366 A 6.982 6.982 0 0 1 50.093 0.879 A 5.705 5.705 0 0 1 50.928 1.416 A 4.883 4.883 0 0 1 51.592 1.987 Q 52.608 3.049 52.236 4.286 A 2.841 2.841 0 0 1 52.124 4.59 A 43.398 43.398 0 0 0 51.62 5.817 Q 51.114 7.099 50.498 8.841 A 148.003 148.003 0 0 0 50.293 9.424 A 2933.938 2933.938 0 0 1 47.043 18.801 Q 40.498 37.573 38.257 42.969 Q 35.789 48.909 33.888 52.759 A 80.777 80.777 0 0 1 33.447 53.638 A 75.439 75.439 0 0 1 29.973 59.721 A 86.373 86.373 0 0 1 28.638 61.768 A 62.364 62.364 0 0 1 23.913 67.949 A 56.094 56.094 0 0 1 22.754 69.238 A 41.036 41.036 0 0 1 18.867 72.919 Q 14.353 76.625 10.217 77.289 A 11.575 11.575 0 0 1 9.375 77.393 Q 7.327 77.56 5.994 76.94 A 4.051 4.051 0 0 1 5.566 76.709 Q 3.125 75.244 3.125 73.926 A 1.409 1.409 0 0 1 3.716 72.78 Q 4.215 72.387 5.138 72.146 A 7.597 7.597 0 0 1 5.347 72.095 A 12.465 12.465 0 0 0 7.749 71.261 Q 8.81 70.773 9.902 70.066 A 20.347 20.347 0 0 0 9.937 70.044 A 32.978 32.978 0 0 0 14.192 66.741 A 36.479 36.479 0 0 0 14.502 66.455 A 50.292 50.292 0 0 0 21.721 57.918 A 43.62 43.62 0 0 0 24.512 53.076 A 114.789 114.789 0 0 0 27.246 46.899 A 89.536 89.536 0 0 0 29.395 41.065 L 33.203 29.443 A 79.752 79.752 0 0 0 31.908 31.051 Q 31.257 31.88 30.553 32.813 A 135.732 135.732 0 0 0 30.078 33.447 L 26.563 38.135 A 102.673 102.673 0 0 1 24.104 41.137 Q 21.121 44.632 18.945 46.387 Q 13.184 51.025 8.643 51.025 A 10.684 10.684 0 0 1 5.486 50.59 Q 2.18 49.57 0.73 46.158 A 10.73 10.73 0 0 1 0.586 45.801 A 9.486 9.486 0 0 1 0.112 43.841 A 12.735 12.735 0 0 1 0 42.114 A 14.42 14.42 0 0 1 0.156 40.062 Q 0.332 38.837 0.708 37.476 A 46.402 46.402 0 0 1 1.755 34.185 A 55.634 55.634 0 0 1 2.539 32.129 Q 3.662 29.346 4.981 26.416 Z"
              vector-effect="non-scaling-stroke"
            />
          </g>
        </motion.svg>
      </div>
    </div>
  );
}
