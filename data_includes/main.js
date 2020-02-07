PennController.ResetPrefix(null); // Initiates PennController
PennController.AddHost("https://filedn.com/lDf2Oa0trFMzhcSFiv5VDuu/ibex/"); // loads pictures from external server


PennController.Sequence("welcome", "practice", rshuffle("experiment"), "send", "final")

// Welcome text /////////////
PennController( "welcome",
    defaultText
        .print()
    ,
    newText("text1", "<h2>Welcome to the experiment!</h2>")
    ,
    newText("text3", "<p>Thank you for your participation.</p>")
    ,
    newText("text4", "<p>In this experiment you need to read a few sentences and perform some simple decision tasks.</p>")
    ,
    newText("text2", "<p>Humboldt Universitaet zu Berlin, Department of German Language and Linguistics</p>")
    ,
    //newText("text3","<p>Please enter your ID and then click the button below to start the experiment.</p>")
    //,
    //newTextInput("ID")
    //    .print()
    //,
    //newVar("ID")
    //    .settings.global()
    //    .set( getTextInput("ID") )
    //,
    newButton("button1", "continue")
        .print()
        .wait()
    ,
    getText("text1")
        .remove()
    ,
    getText("text3")
        .remove()
    ,
    getText("text4")
        .remove()
    ,
    getText("text2")
        .remove()
    ,
    //getText("text3")
    //    .remove()
    //,
    //getTextInput("ID")
    //    .remove()
    //,
    getButton("button1")
        .remove()
    ,
    newHtml("consentInfo", "consentInfo.html")
        .settings.log()
        .print()
    ,
    newButton("button2", "continue")
        .print()
        .wait(getHtml("consentInfo").test.complete()
            .failure( getHtml("consentInfo").warn() ) // wait and display warning message if not all the obligatory fields in the html document are filled
          )
    ,
    getHtml("consentInfo")
        .remove()
    ,
    getButton("button2")
        .remove()
    ,
    newHtml("instructions", "instructions.html")
        .print()
    ,
    newButton("button3", "continue")
        .print()
        .wait()
    ,
    getHtml("instructions")
        .remove()
    ,
    getButton("button3")
        .remove()
    ,   
    newHtml("instructions2", "instructions2.html")
        .print()
    ,
    newButton("button4", "continue")
        .print()
        .wait()
    ,
    getHtml("instructions2")
        .remove()
    ,
    getButton("button4")
        .remove()
    ,
    newHtml("VPInfo", "VPInfo.html")
        .settings.log() // log inputs in html
        .print()
    ,
    newButton("start")
        .print()
        .wait(
          getHtml("VPInfo").test.complete()
            .failure( getHtml("VPInfo").warn() )
        )
)
//.log( "ID" , getVar("ID") )

// Practice Trail ////////

PennController("practice",
newTimer(500)
          .start()
          .wait()
      ,
      newText("Trial1", "John works all day. He is always exhausted.")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("Trial1")
          .remove()
      ,
      newText("Trial2", "John is a horse.")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("Trial2")
          .remove()
      ,
      newTimer("timer1", 1000)
          .start()
          .wait()
      ,
      newText("Trial3", "<b><font size='6'>farm</font></b>")
      ,
      newText("No1", "<small>No [F]</small>")
           .settings.css("font-size", "medium")
      ,
      newText("Yes1", "<small>Yes [J]</small>")
           .settings.css("font-size", "medium")
      ,
      newCanvas("LDT1", 700, 500)
          .settings.center()
          .settings.add("center at 50%", "top at 0%", getText("Trial3"))
          .settings.add(250, 50, getText("No1"))
          .settings.add(410, 50, getText("Yes1"))
          .print()
      ,
      newSelector()
          .settings.add(getText("No1"), getText("Yes1"))
          .settings.keys("F", "J")
          .wait()
      ,
      getCanvas("LDT1")
          .remove()
      ,
      newText("pleasewait1","Please wait until the next trial starts. Do not press any key.")
          .settings.css("font-size", "large")
          .print()
      ,
      newTimer(1000)
          .start()
          .wait()
      ,
      getText("pleasewait1")
         .remove()
      ,
    newTimer(500)
          .start()
          .wait()
      ,
      newText("Trial4", "Mary feeds her whole family. She is always giving them food.")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("Trial4")
          .remove()
      ,
      newText("Trial5", "Mary is a soup kitchen.")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("Trial5")
          .remove()
      ,
      newTimer(400)
          .start()
          .wait()
      ,
     newText("Trial6", "<b><font size='6'>slint</font></b>")
      ,
      newText("No2", "<small>No [F]</small>")
      ,
      newText("Yes2", "<small>Yes [J]</small>")
      ,
      newCanvas("LDT2", 700, 500)
          .settings.center()
          .settings.add("center at 50%", "top at 0%", getText("Trial6"))
          .settings.add(250, 50, getText("No2"))
          .settings.add(410, 50, getText("Yes2"))
          .print()
      ,
      newSelector()
          .settings.add(getText("No1"), getText("Yes1"))
          .settings.keys("F", "J")
          .wait()
      ,
      getCanvas("LDT2")
          .remove()
      ,
      newText("pleasewait3","<p>End of the practice round. The actual experiment is about to begin.</p><p>Remember, press <b>F</b> to answer <b>No</b> and <b>J</b> to answer <b>Yes</b>.</p><p>You can press the spacebar to continue to the experiment now.</p>")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("pleasewait3")
         .remove()
)

// Main part of the experiment /////////

PennController.Template(
  variable => PennController("experiment",
      newTimer(500)
          .start()
          .wait()
      ,
       newText("Teil1", variable.Teil1)
          .settings.log()
      ,
      newCanvas("canvas1", 700, 500)
          //.settings.center()
          .settings.add("center at 50%", "top at 0%",getText("Teil1"))
          .settings.log()
          .print()
      ,
      newKey(" ")
          .settings.log()
          .wait()
      ,
      getCanvas("canvas1")
          .remove()
      ,
      newText("Teil2", variable.Teil2)
          .settings.log()
      ,
      newCanvas("canvas2", 700, 500)
          //.settings.center()
          .settings.add("center at 50%", "top at 0%",getText("Teil2"))
          .settings.log()
          .print()
      ,
      newKey(" ")
          .settings.log()
          .wait()
      ,
      getCanvas("canvas2")
          .remove()
      ,
      newTimer("timer", variable.Time)
          .start()
          .wait()
      ,
      newText("Target", variable.Target)
          .settings.log()
          .settings.css("font-weight","bold")
          .settings.css("font-size", "xx-large")
      ,
      newText("No", "<small>No [F]</small>")
          .settings.css("font-size", "medium")
      ,
      newText("Yes", "<small>Yes [J]</small>")
          .settings.css("font-size", "medium")
      ,
      newCanvas("LDT", 700, 500)
          .settings.center()
          .settings.add("center at 50%", "middle at 0%", getText("Target"))
          .settings.add(250, 50, getText("No"))
          .settings.add(410, 50, getText("Yes"))
          .settings.log()
          .print()
      ,
      newSelector()
          .settings.add(getText("No"), getText("Yes"))
          .settings.keys("F", "J")
          .settings.log()
          .wait()
      ,
      getCanvas("LDT")
          .remove()
      ,
      newText("pleasewait","Please wait until the next trial starts. Do not press any key.")
          .settings.css("font-size", "large")
          .print()
      ,
      newTimer("wait", 1000)
          .start()
          .wait()
      ,
      getText("pleasewait")
         .remove()
  )
  //.log( "ID"     , getVar("ID")    )
  .log( "ItemNum"   ,variable.ItemNum   )
  .log("Prime", variable.Prime)
  .log( "Target" , variable.Target )
  .log( "Group"  , variable.Group )
  .log( "Condition", variable.Condition )
  .log("Time", variable.Time)
  .log("LDT", variable.LDT)
)


// Experiment completion screen///////

PennController.SendResults("send") // send results before participants seeing the completion screen

PennController("final",
    newText("<p>This is the end of the experiment. The results were successfully sent to the server. Thank you for your participation!</p>")
        .print()
    ,
    newCanvas("empty6", 1, 10)
    .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=28B5F87A'>Click here to confirm your participation.</a></p>")
        .print()
    ,
    newText("<p>You can close the window now.</p>")
        .print()
    ,
    newButton("void") // create an empty button that makes the screen stay
        .wait()
  )
