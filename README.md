# georgi-draganov-canvas-task


# HTML5 Canvas animation task

Hello everyone,

After going through the basics of dynamic animation last week, let each of you test your new skills and write a simple HTML5 canvas application.

# Task

Write an animation that allows the user to create dynamic animated objects by clicking on the surface of the canvas with applied gravity pulling them down.

Example: Clicking on x: 200 and y: 200, create a new object at the exact coordinate and start animating it down.


- The canvas should be 512x512 *
- Maintain a square or circle. At each new click, decide dynamically with `Math.random ()` whether the object to be created will be a square or a circle. *
- When you touch the lower end of the canvas, jump back (reversal of velocity) *
- Do not allow objects to go beyond the canvas. *
- Have a counter visualized with `fillText` in the upper right corner of the canvas to count how many objects have been created *
- Each object should have a random color, width and height (per square) and radius (per circle) *
- To have a separate `<input type =` `" `` number`` "` `/>` field that allows to dynamically control the value of gravity *
- Allow interaction with touch screens.
- Allow sizing for retina screens.
- Use the time elapsed from the last frame for smooth animation. *
- Use a Javascript build system. You can use `gulp`,` webpack`, `rollup` or whatever else you want. Generate a final build file. *
- Use git with clearly arranged commits. To be able to track any improvements made and to be able to return to a specific phase of the project. *
- Have a package.json file that allows the project to be started locally with the `npm run start` command. *
