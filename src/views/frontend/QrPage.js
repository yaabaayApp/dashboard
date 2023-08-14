import React, { useEffect } from 'react'

export default function QrPage() {

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.yaabaay.app";
    } else if (isiOS) {
      window.location.href = "https://apps.apple.com/us/app/yaabaay/id6450189135";
    } else {
      window.location.href = "https://play.google.com/store/apps/details?id=com.yaabaay.app";
    }
  }, []);

  return (
      <></>
  )

}
