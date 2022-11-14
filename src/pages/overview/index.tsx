import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import OverviewCard from "../../components/overview/overview-card";
import IdentityStore from "../../store/identity-store";
import Layout from "../../components/layout/layout";
import ReactPlayer from "react-player";
import { truncate } from "fs";

let overview_list = require("../../data/overview.json");

interface OverviewObject {
  id: number;
  m1: string;
  m2: number;
  m3: string;
  m3_comment?: string;
  m4: string;
  m4_text: string;
  m5?: number;
  m5_text?: string;
}

export default function Overview(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const [metrics, setMetrics] = useState<OverviewObject[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setMetrics(overview_list);
  }, []);

  return (
    <Layout variant={2}>
      <Navbar>
        <div className="margins1">
          <div className="welcome-margin">
            <div className="flex font-porsche">
              <div
                className="welcome"
                style={{
                  fontSize: "1.4rem",
                  marginTop: "10px",
                }}
              >
                Welcome,
              </div>
              <span
              className="logged-user"
                style={{
                  marginLeft: "10px",
                  marginTop: "12px",
                  fontSize: "1.4rem",
                }}
              >
                {IdentityStore.loggedUser?.info()}
              </span>
            </div>
          </div>
          <div
            className="font-porsche white mt10 show-info"
            style={{ fontSize: "19px" }}
          >
            What forward31 is about, and some info on what the dashboard
            presents below. We address opportunities that are hidden in plain
            sight. We challenge the status-quo and dare to dream big. We don’t
            incubate or accelerate. Founders get majority stake. With our
            network and assets, they have the unfair advantage.{" "}
          </div>

          <div className="relative">
            <ReactPlayer
              url="./founders/169-2K.mp4"
              width={"100%"}
              height={"auto"}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              playing={true}
              className="scale2"
            />

            <div
              className="font-porsche white mt10 show-info-d"
              style={{ fontSize: "19px" }}
            >
              What forward31 is about, and some info on what the dashboard
              presents below. We address opportunities that are hidden in plain
              sight. We challenge the status-quo and dare to dream big. We don’t
              incubate or accelerate. Founders get majority stake. With our
              network and assets, they have the unfair advantage.{" "}
            </div>

            <div className="absolute">
              <h3 className="show-info">Portfolio Overview</h3>

              <div className="gridrow">
                {metrics.map((el: OverviewObject) => {
                  return (
                    <div className="gridcard">
                      <OverviewCard props={el}></OverviewCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </Layout>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}
