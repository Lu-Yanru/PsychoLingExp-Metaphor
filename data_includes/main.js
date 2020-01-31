PennController.ResetPrefix(null); // Initiates PennController
PennController.AddHost("https://filedn.com/lDf2Oa0trFMzhcSFiv5VDuu/ibex/"); // loads pictures from external server


PennController.Sequence("welcome", "practice", rshuffle("experiment"), "send", "final")

// Welcome text /////////////
PennController( "welcome",
    defaultText
        .print()
    ,
    newText("text1", "<p>Welcome to the experiment!</p>")
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
      newText("Trial3", "<p style='color:red'><big>farm</big></p>")
      ,
      newText("No1", "<small>No [F]</small>")
      ,
      newText("Yes1", "<small>Yes [J]</small>")
      ,
      newCanvas("LDT1", 700, 500) // Should we generally create a canvate for the sentences as well? Some long sentences strech across the whole screen and look awful...
          .settings.add(330, 0, getText("Trial3"))
          .settings.add(200, 80, getText("No1"))
          .settings.add(460, 80, getText("Yes1"))
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
      newText("Trial6", "slint")
      ,
      newText("No", "<b>No [F]</b>")
      ,
      newText("Yes", "<b>Yes [J]</b>")
      ,
      newCanvas("LDT2", 700, 500) // Should we generally create a canvate for the sentences as well? Some long sentences strech across the whole screen and look awful...
          .settings.add(330, 0, getText("Trial6"))
          .settings.add(200, 150, getText("No"))
          .settings.add(460, 150, getText("Yes"))
          .print()
      ,
      newSelector()
          .settings.add(getText("No"), getText("Yes"))
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
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("Teil1")
          .remove()
      ,
      newText("Teil2", variable.Teil2)
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("Teil2")
          .remove()
      ,
      newTimer("timer", variable.Time)
          .start()
          .wait()
      ,
      newText("Target", variable.Target)
      ,
      newText("No", "<b>No [F]</b>")
      ,
      newText("Yes", "<b>Yes [J]</b>")
      ,
      newCanvas("LDT", 700, 500) // Should we generally create a canvate for the sentences as well? Some long sentences strech across the whole screen and look awful...
          .settings.add(330, 0, getText("Target"))
          .settings.add(200, 150, getText("No"))
          .settings.add(460, 150, getText("Yes"))
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

    newText("Code",  " <p>Important:</p> <p> Please copy the following code and paste it in the Clickworker form.<p> </p> Payment will proceed only after proceeding with this step!</p>")
    .print()

    ,

    newCanvas("empty7", 1, 5)
    .print()

    ,

    newText("Code2", "<b> Code: EXTMET1920 </b>")
    .print()

    ,

    newText("<p><a href='https://www.type.your/website/confirmation/link.here'>Click' here to confirm your participation.</a></p>")
        .print()
    ,
    newText("<p>You can close the window now.</p>")
        .print()
    ,
    newButton("void") // create an empty button that makes the screen stay
        .wait()
  )
