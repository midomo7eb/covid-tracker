import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import useSuperCluster from "use-supercluster";
import NavBar from "./navBar";
import { getUsersWithLoc } from "../services/userService";
import "./dashboard.css";
const Marker = ({ children }) => children;

const Dashboard = () => {
  const navigate = useNavigate();
  const mapRef = useRef();
  const [zoom, setZoom] = useState(1);
  const [users, setUsers] = useState([]);
  const [bounds, setBounds] = useState(null);
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user === undefined) {
      navigate("/login");
    }
  } catch (ex) {
    navigate("/login");
  }
  const fetchUsers = async () => {
    try {
      const response = await getUsersWithLoc();

      setUsers(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [zoom]);

  const points = users.map((user) => ({
    type: "Feature",
    properties: {
      cluster: false,
      userId: user._id,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(user.location.lng),
        parseFloat(user.location.lat),
      ],
    },
  }));
  const { clusters, supercluster } = useSuperCluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  return (
    <>
      <NavBar />
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY,
          }}
          defaultCenter={{ lat: 29.9602, lng: 31.2569 }}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;
            const clusterId = cluster.properties.userId;
            if (isCluster) {
              let size = (pointCount * 20) / users.length;
              return (
                <Marker
                  lat={latitude}
                  lng={longitude}
                  key={`cluster-${cluster.id}`}
                  className="cluster-marker"
                >
                  <div
                    className="cluster-marker"
                    style={{ width: size + "px", height: size + "px" }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            } else {
              return (
                <Marker
                  key={`cluster-${cluster.properties.userId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div className="well-marker">
                    <img src="/covidHome.png" alt="" />
                  </div>
                </Marker>
              );
              // {
              //   users.map((user) => (
              //     <Marker
              //       key={user._id}
              //       lat={parseFloat(user.location.lat)}
              //       lng={parseFloat(user.location.lng)}
              //     >
              //       <div className="users">
              //         <img src="/covid.png" alt="user is infected" />
              //       </div>
              //     </Marker>
              //   ));
              // }
            }
          })}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Dashboard;
