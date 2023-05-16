import React from "react";
import Image from "next/image";

const ProfileImage: React.FC<{ src?: string | null; className?: string }> = ({
  src,
  className = "",
}) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt="profile-picture"
          className="object-fit"
          fill
          quality={100}
        />
      ) : (
        <Image
          src="/icons/default-profile.png"
          alt="default-profile-picture"
          className="object-fit"
          fill
          quality={100}
        />
      )}
    </div>
  );
};

export default ProfileImage;
