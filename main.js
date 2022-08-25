beli = "";
unsto = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1status = "";
song2status = "";
scoreRightWrist = 0;

function preload()
{
    beli = loadSound("beliver.mp3");
    unsto = loadSound("unstoppable.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, load);
    poseNet.on('pose' , gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
song1status = beli.isPlaying();
song2status = unsto.isPlaying();
    fill("green");
    stroke("yellow");

    if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);
    beli.stop();
    if(song2status == false)
    {
        unsto.play();
        document.getElementById("head").innerHTML = "Unstoppable";
    }
}

    if(scoreLeftWrist > 0.2)
    {
        circle( leftWristX  ,leftWristY , 20);
        unsto.stop();
        if(song1status == false)
        {
          beli.play();
          document.getElementById("head").innerHTML = "Beliver";
        }
    } 
}

function load()
{
console.log("PoseNet model is initialise");
}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].socre;
    console.log("Score Right Wrist = " + scoreRightWrist + "Score LEFT WRIST = " + scoreLeftWrist+ "Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY + "Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
}
}