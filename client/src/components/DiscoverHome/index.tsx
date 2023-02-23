import BannerMangas from "./BannerMangas";
import PopularGenres from "./PopularGenres/index";
import "../../scss/Home/Discover.scss";

type Props = {
  /* res: any; */
};

const DiscoverHome = ({}: /* res */ Props) => {
  return (
    <div className="five discover-section">
      <BannerMangas />
      <PopularGenres /* res={res} */ />
      <h2 className="recent-newa-title">Recent News</h2>
      <div className="recent-news-container">
        <div className="recent-news-card">
          <img
            src="https://images.squarespace-cdn.com/content/v1/60b7f1bed70b3159a0b9141d/4b1b00b1-3ebd-4a34-b7d6-45864ae6e62c/kaiju-no-8-anime-adaptation-is-confirmed-to-premiere-soon.jpeg?format=1500w"
            alt=""
          />
          <div>
            <p className="date">5 Aug</p>
            <span>
              <h5>Kaiju No. 8 Anime Adaptation Officially Announced</h5>
              <p className="text-content">
                After a series of reports swept the internet claiming that Kaiju
                No. 8 was about to receive an anime adaptation, "Kaiju No. 8"
                (Kaijuu 8-gou), a sci-fi - horror manga themed created by
                Matsumoto Naoya is claimed to receive an anime adaptation which
                will be produced by TOHO Animation.
              </p>
              <p className="continue">Continue reading...</p>
            </span>
          </div>
        </div>
        <div className="recent-news-card">
          <img
            src="https://images.squarespace-cdn.com/content/v1/60b7f1bed70b3159a0b9141d/e87535ea-293c-45e9-b72c-9c54cbdd308e/6282-Header_KaijuNo8_2000x800-guildmv.jpeg?format=1500w"
            alt=""
          />
          <div>
            <p className="date">5 Aug</p>
            <span>
              <h5>Kaiju No. 8 Anime Adaptation Officially Announced</h5>
              <p className="text-content">
                After a series of reports swept the internet claiming that Kaiju
                No. 8 was about to receive an anime adaptation, fans are now
                holding their breath after a tweet from the official Kaiju No. 8
                Twitter page tweeted a date with an image containing coordinates
              </p>
              <p className="continue">Continue reading...</p>
            </span>
          </div>
        </div>
        <div className="recent-news-card">
          <img
            src="https://images.squarespace-cdn.com/content/v1/60b7f1bed70b3159a0b9141d/d9a020bc-0e25-4d44-b4c4-6510df8274f6/Sakamoto+Days+-+Guildmv.jpg?format=750w"
            alt=""
          />
          <div>
            <p className="date">2 Aug</p>
            <span>
              <h5>Is Sakamoto Days Getting an Anime Adaptation?</h5>
              <p className="text-content">
                As of today Weibo posts talking about the TV anime adaptations
                of SAKAMOTO DAYS and Blue Box have begun to appear. An official
                announcement has not been made confirming this news.
              </p>
              <p className="continue">Continue reading...</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverHome;
