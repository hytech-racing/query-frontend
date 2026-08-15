import "@/css/Navbar.css";
import { useEffect, useState } from "react";

const PingStatus: React.FC = () => {
  const [vpnActive, setVpnActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleGetStatus = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ping`, {});

      setVpnActive(res.ok); // res is always truthy if fetch didn't throw
    } catch {
      setVpnActive(false);
    }
  };

  useEffect(() => {
    handleGetStatus();
    // Poll instead of checking once on mount -- otherwise the badge can stay
    // stuck on "active" long after the backend actually goes down.
    const intervalId = setInterval(handleGetStatus, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`vpnStatus ${vpnActive ? "vpnStatusGood" : "vpnStatusBad"}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <div className="vpnStatusHover">
          VPN is {vpnActive ? "active" : "inactive"}
        </div>
      ) : null}
    </div>
  );
};

export default PingStatus;
