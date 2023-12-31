/******************************************************************************
 *    Copyright 2020 Misty Robotics, Inc.
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 * 	 **WARRANTY DISCLAIMER.**
 *
 * 	 * General. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MISTY
 * 	 ROBOTICS PROVIDES THIS SAMPLE SOFTWARE "AS-IS" AND DISCLAIMS ALL
 * 	 WARRANTIES AND CONDITIONS, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
 * 	 INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * 	 PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, AND NON-INFRINGEMENT OF
 * 	 THIRD-PARTY RIGHTS. MISTY ROBOTICS DOES NOT GUARANTEE ANY SPECIFIC
 * 	 RESULTS FROM THE USE OF THIS SAMPLE SOFTWARE. MISTY ROBOTICS MAKES NO
 * 	 WARRANTY THAT THIS SAMPLE SOFTWARE WILL BE UNINTERRUPTED, FREE OF VIRUSES
 * 	 OR OTHER HARMFUL CODE, TIMELY, SECURE, OR ERROR-FREE.
 * 	 * Use at Your Own Risk. YOU USE THIS SAMPLE SOFTWARE AND THE PRODUCT AT
 * 	 YOUR OWN DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE FOR (AND MISTY
 * 	 ROBOTICS DISCLAIMS) ANY AND ALL LOSS, LIABILITY, OR DAMAGES, INCLUDING TO
 * 	 ANY HOME, PERSONAL ITEMS, PRODUCT, OTHER PERIPHERALS CONNECTED TO THE PRODUCT,
 * 	 COMPUTER, AND MOBILE DEVICE, RESULTING FROM YOUR USE OF THIS SAMPLE SOFTWARE
 * 	 OR PRODUCT.
 *
 * 	 Please refer to the Misty Robotics End User License Agreement for further
 * 	 information and full details:
 * 	 	https://www.mistyrobotics.com/legal/end-user-license-agreement/
 ******************************************************************************/

// Misty Looks around when she does not see a human faces

misty.Set("faceInFOV", false, false);
misty.MoveArmDegrees("both", 90, 100);

function _look_around(repeat = true) {
  if (!misty.Get("faceInFOV"))
    misty.MoveHeadDegrees(
      gaussianRandom(-20, 35),
      gaussianRandom(-35, 35),
      gaussianRandom(-75, 75),
      300,
    );
  if (repeat)
    misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);
}
misty.RegisterTimerEvent("look_around", 10, false);

function gaussianRand() {
  var u = (v = Math.random());
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) return gaussianRand();

  return num;
}

function gaussianRandom(start, end) {
  return Math.floor(start + gaussianRand() * (end - start + 1));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --------------------- Face Detection ------------------------------

misty.Debug("Homing Head and Arms");
_timeoutToNormal();

misty.StartFaceDetection();

function registerFaceDetection() {
  misty.AddPropertyTest("FaceDetect", "PersonName", "exists", "", "string");
  misty.RegisterEvent("FaceDetect", "FaceRecognition", 3000, true);
}

function _FaceDetect(data) {
  misty.Debug(JSON.stringify(data));
  misty.Set("faceInFOV", true, false);
  misty.ChangeLED(148, 0, 211);
  misty.DisplayImage("e_Joy.jpg");
  misty.PlayAudio("s_Awe.wav", 100);

  // wave
  misty.MoveArmDegrees("both", -26, 100);
  misty.Pause(1000);
  misty.MoveArmDegrees("both", 90, 100);

  misty.RegisterTimerEvent("timeoutToNormal", 6000, false);
}

registerFaceDetection();

function _timeoutToNormal() {
  misty.Set("faceInFOV", false, false);
  misty.Pause(100);
  // misty.MoveHeadDegrees(0.1, 0.1, 0.1, 40);
  misty.ChangeLED(0, 255, 0);
  misty.DisplayImage("e_DefaultContent.jpg");
}
