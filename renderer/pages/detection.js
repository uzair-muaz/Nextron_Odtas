import React from 'react';
import Map from '../components/Map';
import Toggle from '../components/Toggle';
import LiveStream from '../components/LiveStream';
import { BiVideoRecording } from 'react-icons/bi';
import { RiFilterLine } from 'react-icons/ri';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
var stopInterval = undefined;

function Detection() {
  const [detection, setDetection] = useState(false);
  const [camera, setCamera] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState('Person');
  const [trackingIDs, setTrackingIDs] = useState([]);

  //   const [width, setWidth] = useState();
  //   const [height, setHeight] = useState();
  //   const [clickX, setClickX] = useState();
  //   const [clickY, setClickY] = useState();

  var width = 0;
  var height = 0;
  var clickX = 0;
  var clickY = 0;

  //to disable the buttons
  const [disabled, setDisabled] = useState(false);
  var stateChanger = { disabled, setDisabled };

  const router = useRouter();

  useEffect(() => {
    //Api to get verifyUser and get userDetails
    const authorizeUser = async () => {
      const response = await fetch('http://localhost:3000/auth/getuser', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });

      if (response.status != 200) {
        router.push('/');
      }
    };
    authorizeUser();
  }, []);

  const formData = { camera, detection, tracking, recording };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { camera, detection, tracking, recording };
    fetch('http://localhost:8000/video/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  const CheckBoxFunction = (e) => {
    if (typeof window !== 'undefined') {
      let all = window.document.getElementById('all-checkbox');
      let person = window.document.getElementById('person-checkbox');
      let htv = window.document.getElementById('htv-checkbox');
      let ltv = window.document.getElementById('ltv-checkbox');
      let bike = window.document.getElementById('bike-checkbox');
      if (person.checked || htv.checked || ltv.checked || bike.checked) {
        all.checked = false;
      }
      if (!person.checked && !htv.checked && !ltv.checked && !bike.checked) {
        all.checked = true;
      }
    }
  };

  const FilterApi = (e) => {
    if (typeof window !== 'undefined') {
      let all = window.document.getElementById('all-checkbox');
      let person = window.document.getElementById('person-checkbox');
      let htv = window.document.getElementById('htv-checkbox');
      let ltv = window.document.getElementById('ltv-checkbox');
      let bike = window.document.getElementById('bike-checkbox');
      var class_filterion_list = [];
      if (!person.checked && !htv.checked && !ltv.checked && !bike.checked)
        class_filterion_list = [];
      if (person.checked) class_filterion_list.push(0);
      if (ltv.checked) class_filterion_list.push(1);
      if (htv.checked) class_filterion_list.push(2);
      if (bike.checked) class_filterion_list.push(3);

      let filteredArray = { class_filteration_list: class_filterion_list };
      fetch('http://localhost:8000/video/filterdetection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredArray),
      });
    }
  };

  const trackingPoints = (e) => {
    e.preventDefault();

    console.log(clickX, clickY, height, width);

    var globalX = e.pageX;
    var globalY = e.pageY;
    if (typeof window !== 'undefined') {
      var offsets = document.getElementById('Stream').getBoundingClientRect();
      var top = offsets.top;
      var left = offsets.left;
      var divWidth = offsets.width;
      var divHeight = offsets.height;

      var positionX = globalX - left;
      var positionY = globalY - top;

      clickX = positionX;
      clickY = positionY;
      height = divHeight;
      width = divWidth;

      //   setClickX(parseInt(positionX));
      //   setClickY(parseInt(positionY));
      //   setHeight(parseInt(divHeight));
      //   setWidth(parseInt(divWidth));
    }
  };

  // FOR SINGLE TRACKER (Ahmad Bhai look this for ref of object sent)
  const singleTrackerAPI = (e) => {
    e.preventDefault();
    const data = { width, height, clickX, clickY };
    fetch('http://localhost:8000/video/trackingpoints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  const setAlarmAPI = (e) => {
    e.preventDefault();
    let selectedClass;
    if (selectedAlarm == 'Person') selectedClass = 0;
    if (selectedAlarm == 'HTV') selectedClass = 1;
    if (selectedAlarm == 'Bike') selectedClass = 2;
    if (selectedAlarm == 'LTV') selectedClass = 3;
    let formData = { alarm_class_number: selectedClass, is_alarm: !alarm };
    fetch('http://localhost:8000/video/setalarm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };

  const getTrackingID = async (e) => {
    stopInterval = setInterval(async () => {
      const response = await fetch('http://localhost:8000/video/trackingids', {
        method: 'Get',
      });
      if (response.status == 200) {
        var data = await response.json();
        setTrackingIDs(data);
      }
    }, 3000);
  };

  const delInterval = (e) => {
    console.log('stopInterval - ' + stopInterval);
    clearInterval(stopInterval);
    stopInterval = undefined;
  };

  return (
    <div className="h-full">
      <div className="h-[9%]">
        <Navbar />
      </div>
      <div className="bg-slate-200 h-[91%] ">
        {/* // Most outer container that holds the nav bar and the containter for dashboard */}
        <div className="bg-slate-50 h-full ">
          {/* Containter for Dashboard Elements */}
          <div className=" h-[100%] flex">
            {/* Container 1 for Toggle Buttons and Detection Filteration options */}
            <div className="w-[20%] h-full border-gray-600  border-2">
              {/* Video Options  */}
              <h1 className=" mt-[5%] mb-[10%] text-xl text-center ">
                Video Options
              </h1>
              {/* containter containing text and toggle for livestream  */}
              <div className="flex h-[5%] items-center mt-[5%] ">
                <div className="ml-[10%] text-base w-[50%]"> LiveStream </div>
                <div
                  onClick={() => {
                    if (disabled == false) {
                      setCamera(!camera);
                    }
                  }}
                  className="h-[70%] w-[15%]  ml-[15%]"
                >
                  {' '}
                  <Toggle toggleState={camera} />{' '}
                </div>
              </div>

              {/* containter containing text and toggle for Detection  */}
              <div className="flex h-[5%] items-center mt-[5%] ">
                <div className="ml-[10%] text-base w-[50%]"> Detection </div>
                <div
                  onClick={() => {
                    if (disabled == false) {
                      setDetection(!detection);
                    }
                  }}
                  className="h-[70%] w-[15%]  ml-[15%]"
                >
                  {' '}
                  <Toggle toggleState={detection} />{' '}
                </div>
              </div>
              {/* containter containing text and toggle for Tracking  */}
              <div className="flex h-[5%] items-center mt-[5%] ">
                <div className="ml-[10%] text-base w-[50%]"> Tracking </div>
                <div
                  onClick={(e) => {
                    setTracking(!tracking);
                    console.log('in div checking---' + stopInterval);
                    if (stopInterval == undefined) {
                      console.log('in if');
                      getTrackingID(e);
                    } else {
                      console.log('in else');
                      delInterval(e);
                    }
                  }}
                  className="h-[70%] w-[15%]  ml-[15%]"
                >
                  {' '}
                  <Toggle toggleState={tracking} />{' '}
                </div>
              </div>

              {/* Filterteration options */}
              <h1 className=" mt-[25%] mb-[10%] text-xl text-center ">
                Filteration Options
              </h1>

              {/* containter containing text and toggle for Detection  */}
              <div className="flex h-[5%] items-center mt-[5%]">
                <div className="ml-[10%] text-sm w-[50%]"> All </div>
                <input
                  id="all-checkbox"
                  type="checkbox"
                  value="All"
                  className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]"
                  defaultChecked
                />
              </div>

              {/* containter containing text and toggle for Detection  */}
              <div className="flex h-[5%] items-center mt-[5%]">
                <div className="ml-[10%] text-sm w-[50%]"> HTV </div>
                <input
                  id="htv-checkbox"
                  type="checkbox"
                  value=""
                  className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]"
                  onChange={(e) => CheckBoxFunction(e)}
                />
              </div>

              {/* containter containing text and toggle for Detection  */}
              <div className="flex h-[5%] items-center mt-[5%]">
                <div className="ml-[10%] text-sm w-[50%]"> LTV </div>
                <input
                  id="ltv-checkbox"
                  type="checkbox"
                  value=""
                  className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]"
                  onChange={(e) => CheckBoxFunction(e)}
                />
              </div>

              {/* containter containing text and toggle for Detection  */}
              <div className="flex h-[5%] items-center mt-[5%]">
                <div className="ml-[10%] text-sm w-[50%]"> Person </div>
                <input
                  id="person-checkbox"
                  type="checkbox"
                  value=""
                  className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]"
                  onChange={(e) => CheckBoxFunction(e)}
                />
              </div>

              {/* containter containing text and toggle for Detection  */}
              <div className="flex h-[5%] items-center mt-[5%]">
                <div className="ml-[10%] text-sm w-[50%]"> Motor / Bikes </div>
                <input
                  id="bike-checkbox"
                  type="checkbox"
                  value=""
                  className=" accent-sky-300 h-[60%] w-[15%]  ml-[15%]"
                  onChange={(e) => CheckBoxFunction(e)}
                />
              </div>

              <div
                onClick={(e) => FilterApi(e)}
                className="bg-sky-200 hover:bg-sky-300 flex items-center p-2 pr-4 rounded-full border hover:border-black mx-[5%] mt-[5%] justify-center"
              >
                <RiFilterLine className=" mr-2 ml-1" />
                <label className="text-sm "> Filter By Class </label>
              </div>
            </div>

            {/* Containter 2 divided into 2 blocks one for live stream and one for record options */}
            <div className="w-[60%]  border-y-gray-600 border-x-slate-50 border-2 ">
              {/* Record And Screen Capture Options */}
              <div className="h-[9.9%] flex  justify-center items-center">
                <div
                  className="bg-sky-200 hover:bg-sky-300 flex items-center p-2 pr-4 rounded-full border hover:border-black"
                  onClick={() => {
                    if (disabled == false) {
                      setRecording(!recording);
                    }
                  }}
                >
                  <BiVideoRecording className=" mr-2 ml-1" />
                  <label className="text-sm "> Start / Stop Recording </label>
                </div>

                <div className="ml-[20%] flex w-1/4 h-[40%]">
                  <div className="h-full"> Set Alarm</div>
                  <div
                    onClick={(e) => {
                      if (disabled == false) {
                        setAlarm(!alarm);
                        setAlarmAPI(e);
                      }
                    }}
                    className="h-[80%] w-[20%] mr-2 ml-3"
                  >
                    {' '}
                    <Toggle toggleState={alarm} />{' '}
                  </div>
                  <div className="h-full ml-3">
                    <select
                      className="bg-slate-200"
                      onChange={(e) => {
                        setSelectedAlarm(e.target.value);
                      }}
                    >
                      <option value="HTV">HTV</option>
                      <option value="Person">Person</option>
                      <option value="LTV">LTV</option>
                      <option value="Bike">Bike</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* LiveStream Container */}
              {camera ? (
                <div
                  onClick={(e) => {
                    singleTrackerAPI(e);
                  }}
                  onMouseMove={(e) => trackingPoints(e)}
                  id="Stream"
                  className="h-[90%] bg-slate-200 border-y-2 border-gray-600 "
                >
                  <LiveStream formData={formData} />
                </div>
              ) : (
                <div className="h-[90%] bg-slate-200 border-t-2  border-gray-600 text-center text-2xl">
                  <FileUpload stateChanger={stateChanger} />
                </div>
              )}
            </div>

            {/* Container 3 divided into 2 blocks one for maps and one for Tracking ID's */}
            <div className="w-[20%] bg-white border-gray-600  border-2">
              <div className="h-[55%]  mb-[1%] bg-slate-50 text-center p-[5%] overflow-auto ">
                <h1 className="text-2xl mb-[2%] border-b-2 border-slate-500 pb-2">
                  Tracking ID's
                </h1>
                {tracking ? (
                  <div className="mt-2">
                    <div>
                      {trackingIDs.map((ids) => (
                        <h2 className="border-slate-400 bg-gray-200 rounded-xl border-1 text-sm p-1 pl-2 font-sans  hover:bg-sky-200 cursor-pointer mb-[1.2%]">
                          Tracking id {ids}
                        </h2>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div></div>
                  </div>
                )}
              </div>
              <div className="h-[44%] ">
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;
