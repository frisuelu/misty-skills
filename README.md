# MISTY SKILLS

Conversational skills for the [Misty](https://www.mistyrobotics.com/) robot using its JavaScript SDK.

## Description

The file structure is the following:

- **misty-streaming**: quick test to stream data through the frontal lens. The recorded video feed
can be seen with a client such as VLC.

- **misty-welcoming-basic**: base skill where Misty reacts to a human face using its Computer Vision AI model.

- **misty-welcoming-by_name**: custom skill based on the previous example, where the logic performs the
following checks:

    1. Activate the facial recognition function for Misty
    2. Retrieve facial data when the person's face is in view of the CV model
    3. If the detected face is not in the database:
        - Record it and ask using the microphone for the person's
        name
        - Record the name as an audio file that can be enconded and sent to Google's STT service for
        transcription
        - Retrieve the transcribed name from the speech file and record the face using the name as its label
    4. Otherwise, a face with its label must be present in memory. In that case, greet the person with
    their name.

The folder contains two files, where the "_v2" one contains additional complexity in its logic.
