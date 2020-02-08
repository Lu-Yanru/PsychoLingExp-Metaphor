PennController.ResetPrefix(null); // Initiates PennController
PennController.AddHost("https://filedn.com/lDf2Oa0trFMzhcSFiv5VDuu/ibex/"); // loads pictures from external server
PennController.DebugOff()


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
    newText("text4", "<p>In this experiment, you will to read a few sentences and make some simple decisions.</p>")
    ,
    newText("text5", "<p>The experiment will take about 10 minutes.</p>")
    ,
    newText("text2", "<p><small>Humboldt Universitaet zu Berlin, Department of German Language and Linguistics</small></p>")
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
    getText("text5")
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
    newHtml("instructions3", "instructions3.html")
        .print()
    ,
    newButton("button5", "continue")
        .print()
        .wait()
    ,
    getHtml("instructions3")
        .remove()
    ,
    getButton("button5")
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

// Practice Trial ////////

PennController("practice",
      newTimer(500)
          .start()
          .wait()
      ,
      newText("null", " ")
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
      newKey("space1", " ")
          //.wait()
      ,
      newTimer(1500)
          .start()
          .wait()
      ,
      getKey("space1")
          .test.pressed(" ")
          .success(
      getText("Trial2")
          .remove()
      ,
      newTimer("timer1", 1000)
          .start()
          .wait()
      ,
      newText("Trial3", "<b><font size='6'>farm</font></b>")
          .settings.center()
          .print()
      ,
      newText("No1", "<small>No [F]</small>")
           .settings.center()
           .settings.after(newText("Yes1", "<small>Yes [J]</small>").settings.css("padding-left", "100pt").settings.css("font-size", "medium"))
           .settings.css("font-size", "medium")
           .print()
      ,
      //newText("Yes1", "<small>Yes [J]</small>")
      //     .settings.css("font-size", "medium")
      //,
      /*newCanvas("LDT1", 700, 500)
          .settings.center()
          .settings.add("center at 50%", "top at 0%", getText("Trial3"))
          .settings.add(250, 50, getText("No1"))
          .settings.add(410, 50, getText("Yes1"))
          //.settings.add(200, 80, getText("nono")) //added an additional instruction
          //.settings.add(200, 100, getText("yesyes")) //Yes-text for additional instruction
          .print()
      ,*/
      newTimer("reminder1", 1500)
          .settings.callback(getSelector("select1").select(getText("null")))
          .settings.callback(getText("Trial3").settings.text("<small>Please be faster!</small>"))
          .start()
      ,
      newSelector("select1")
          .settings.add(getText("No1"), getText("Yes1"))
          .settings.keys("F", "J")
          .settings.callback(getTimer("reminder1").stop())
          .settings.callback(getText("Trial3").settings.text(" "))
          .wait()
      ,
      /*getCanvas("LDT1")
          .remove()
      ,*/
      getText("No1")
          .remove()
      ,
      newText("proceed1", "<small>Press the space bar to read the next sentence.</small>")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getText("proceed1")
          .remove()
      ,
      getText("Trial3")
          .remove()
      )// what should happen if key successfully being pressed within the timer
          .failure(
            getText("Trial2")
                .remove()
            ,
            newText("failure1", "<small>Too slow! Please try to read the sentences faster.</small>")
                .print()
            ,
            newText("proceed2", "<small>Press the space bar to read the next sentence.</small>")
                .print()
            ,
            newKey(" ")
                .wait()
            ,
            getText("failure1")
                .remove()
            ,
            getText("proceed2")
                .remove()
            ,
            getText("Trial3")
                .remove()
          )//what should happen if key not being pressed within the timer
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
      newKey("space2", " ")
          //.wait()
      ,
      newTimer(1500)
          .start()
          .wait()
      ,
      getKey("space2")
          .test.pressed(" ")
          .success(
            getText("Trial5")
                .remove()
            ,
            newTimer(400)
                .start()
                .wait()
            ,
            newText("Trial6", "<b><font size='6'>slint</font></b>")
                .settings.center()
                .print()
            ,
            newText("No2", "<small>No [F]</small>")
                 .settings.center()
                 .settings.after(newText("Yes2", "<small>Yes [J]</small>").settings.css("padding-left", "100pt").settings.css("font-size", "medium"))
                 .settings.css("font-size", "medium")
                 .print()
            ,
            /*newText("Yes2", "<small>Yes [J]</small>")
                 .settings.css("font-size", "medium")
            ,
            newCanvas("LDT2", 700, 500)
                .settings.center()
                .settings.add("center at 50%", "top at 0%", getText("Trial6"))
                .settings.add(250, 50, getText("No2"))
                .settings.add(410, 50, getText("Yes2"))
                //.settings.add(200, 80, getText("nono")) //added an additional instruction
                //.settings.add(200, 100, getText("yesyes")) //Yes-text for additional instruction
                .print()
            ,*/
            newTimer("reminder2", 1500)
                .settings.callback(getSelector("select2").select(getText("null")))
                .settings.callback(getText("Trial6").settings.text("<small>Please be faster!</small>"))
                .start()
            ,
            newSelector("select2")
                .settings.add(getText("No2"), getText("Yes2"))
                .settings.keys("F", "J")
                .settings.callback(getTimer("reminder2").stop())
                .settings.callback(getText("Trial6").settings.text(" "))
                .wait()
            ,
            /*getCanvas("LDT2")
                .remove()
            ,*/
            getText("No2")
                .remove()
            ,
            newText("proceed3", "<small>Press the space bar to continue.</small>")
                .print()
            ,
            newKey(" ")
                .wait()
            ,
            getText("proceed3")
                .remove()
            ,
            getText("Trial6")
                .remove()
          ) // what should happen if key being pressed within the timer
          .failure(
            getText("Trial5")
                .remove()
            ,
            newText("failure2", "<small>Too slow! Please try to read the sentences faster.</small>")
                .print()
            ,
            newText("proceed4", "<small>Press the space bar to continue.</small>")
                .print()
            ,
            newKey(" ")
                .wait()
            ,
            getText("failure2")
                .remove()
            ,
            getText("proceed4")
                .remove()
            ,
            getText("Trial6")
                .remove()
          ) // what should happen if key not being pressed within the timer
      ,
      newHtml("practiceInfo", "practice.html")
          .print()
      ,
      newKey(" ")
          .wait()
      ,
      getHtml("practiceInfo")
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
      newText("null", " ")
      ,
      newKey("sent1", " ")
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
      newKey("sent2", " ")
          .settings.log()
          //.wait()
      ,
      newTimer("tick", 2000)
          .start()
          .wait()
      ,
      getKey("sent2")
          .test.pressed(" ")
          .success(
            getCanvas("canvas2")
                .remove()
            ,
            getTimer("tick")
                .stop()
            ,
            newTimer("timer", variable.Time)
                .start()
                .wait()
            ,
            newText("Target", variable.Target)
                .settings.center()
                .settings.log()
                .settings.css("font-weight","bold")
                .settings.css("font-size", "xx-large")
                .print()
            ,
            newText("No", "<small>No [F]</small>")
                 .settings.center()
                 .settings.after(newText("Yes", "<small>Yes [J]</small>").settings.css("padding-left", "100pt").settings.css("font-size", "medium"))
                 .settings.css("font-size", "medium")
                 .print()
            ,
            /*newText("Yes", "<small>Yes [J]</small>")
                .settings.css("font-size", "medium")
            ,
            newCanvas("LDT", 700, 500)
                .settings.center()
                .settings.add("center at 50%", "top at 0%", getText("Target"))
                .settings.add(250, 50, getText("No"))
                .settings.add(410, 50, getText("Yes"))
                .settings.log()
                .print()
            ,*/
            newTimer("reminder", 1500)
                .settings.callback(getSelector("select").select(getText("null")))
                .settings.callback(getText("Target").settings.text("<small>Please be faster!</small>").settings.css("font-weight","normal").settings.css("font-size", "x-large"))
                .start()
            ,
            newSelector("select")
                .settings.add(getText("No"), getText("Yes"))
                .settings.keys("F", "J")
                .settings.callback(getTimer("reminder").stop())
                .settings.callback(getText("Target").settings.text(" "))
                .settings.log()
                .wait()
            ,
            getText("No")
                .remove()
            ,
            newText("proceed", "<small>Press the space bar to read the next sentence.</small>")
                .print()
            ,
            newKey(" ")
                .wait()
            ,
            getText("proceed")
                .remove()
            ,
            getText("Target")
                .remove()
            /*getCanvas("LDT")
                .remove()
            ,*/
          )
          .failure(
            getCanvas("canvas2")
                .remove()
            ,
            newText("failure", "<small>Too slow! Please try to read the sentences faster.<small>")
                .print()
            ,
            newText("proceedEx", "<small>Press the space bar to read the next sentence.<small>")
                .print()
            ,
            newKey(" ")
                .wait()
            ,
            getText("failure")
                .remove()
            ,
            getText("proceedEx")
                .remove()
            ,
            getText("Target")
                .remove()
          )

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
    newText("<p>This is the end of the experiment. Thank you for your participation!</p>")
        .print()
    ,
    newCanvas("empty6", 1, 10)
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=28B5F87A' target='_blank'>Click here to confirm your participation.</a></p>")
        .print()
    ,
    newText("<p>You can close the window now.</p>")
        .print()
    ,
    newButton("void") // create an empty button that makes the screen stay
        .wait()
  )
