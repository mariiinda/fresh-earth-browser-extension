const copy = {
  menuButtonText: "Menu",
  appButtonText: "App",
  tabList: ["Settings", "About"],
  imageSelectLegend: "Cycle through the following images:",
  imageRefreshLegend: "Image refresh frequency",
  minutes: "minutes",
  hours: "hours",
  hour: "hour",
  aboutTabHTML: `
  <p>
    Fresh Earth picks fresh and sharp satellite images and delivers it
    straight to your browser.
  </p>
  <p>Refresh rate is once every 20 minutes.</p>
  <p>
    The following geostationary satellite images will be shown in sequence:
  </p>
  <ul>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.star.nesdis.noaa.gov/GOES/fulldisk_band.php?sat=G16&band=GEOCOLOR&length=12"
        >
          GOES EAST True Color Western Hemisphere
        </a>
        <br />
        South America and North America, Coast of West Africa&nbsp;
        <small><a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/latest.jpg"
        >
          Source URL
          </a></small>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.star.nesdis.noaa.gov/GOES/fulldisk_band.php?sat=G17&band=GEOCOLOR&length=12"
        >
          GOES West True Color Western Hemisphere
        </a>
        <br />
        Pacific, Hawaii, North America
        <small><a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES17/ABI/FD/GEOCOLOR/5424x5424.jpg"
        >
          Source URL
          </a></small>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://rammb.cira.colostate.edu/ramsdis/online/himawari-8.asp"
        >
          Himawari-8
        </a>
        <br />
        Asian Pacific, Japan, Australia
        <small><a
          target="_blank"
          rel="noopener noreferrer"
          href="http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg"
        >
          Source URL
        </a></small>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/5000x3000.jpg"
        >
        GOES East: Continental US
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/taw/GEOCOLOR/3600x2160.jpg"
        >
        GOES East: Tropical Atlantic
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES17/ABI/SECTOR/tpw/GEOCOLOR/3600x2160.jpg"
        >
        GOES West: Tropical Pacific
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES17/ABI/CONUS/GEOCOLOR/5000x3000.jpg"
        >
        GOES West: US West Coast
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES17/ABI/SECTOR/np/GEOCOLOR/7200x4320.jpg"
        >
        GOES West: Northern Pacific
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/nsa/GEOCOLOR/3600x2160.jpg"
        >
        GOES West: Northern South America
        </a>
      </p>
    </li>
    <li>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/ssa/GEOCOLOR/3600x2160.jpg"
        >
        GOES East: Southern South America
        </a>
      </p>
    </li>
  </ul>
  <h2>Credit</h2>
  <p>
    NASA, NOAA, JMA, Lockheed Martin, Harris Corporation, ULA, MHI and
    everyone else involved with the GOES-16, GOES-17, and Himawari-8
    geostationary satellites.
  </p>
  <p>
    Thanks to
    <a
      href="http://downlinkapp.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Downlink app
    </a>
    for providing inspiration and image sources.
  </p>
  <ul>
    <li>
      <small>
        <strong>GOES</strong>: Geostationary Operational Environmental
        Satellite maintained by NOAA
      </small>
    </li>
    <li>
      <small>
        <strong>Himawari-8</strong>: Courtesy of the
        <a
          href="http://www.jma.go.jp/jma/indexe.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Japanese Meteorological Agency
        </a>
      </small>
    </li>
    <li>
      <small>
        <strong>GeoColor</strong>: GeoColor is a multispectral product
        composed of True Color and Infrared. During the day, the imagery
        looks approximately as it would appear when viewed with human eyes
        from space. At night, the blue colors represent liquid water clouds
        such as fog and stratus, while gray to white indicate higher ice
        clouds, and the city lights come from a static database that was
        derived from the VIIRS Day Night Band. Geocolor was developed at the
        Cooperative Institute for Research in the Atmosphere (CIRA) and
        STAR's Regional and Mesoscale Meteorology Branch (RAMMB).
      </small>
    </li>
  </ul>
  <h2>Privacy</h2>
  <p>
    Fresh Earth does not collect or store any data. It only saves your
    settings in storage and downloads images from the sources provided
    above.
  </p>
  <h2>Made by</h2>
  <p>
    A side project made by
    <a
      href="https://marinda.me/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Marinda</a>. Source code available on
      <a
        href="https://github.com/mariiinda/fresh-earth-browser-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        github</a>.
  </p>

  `,
  satellite: "Satellite",
  view: "View",
  refreshed: "Refreshed",
  status: "Status",
  offline: "Offline",
  loading: "Refreshing",
  imageError: "Image offline"
};

export { copy };
