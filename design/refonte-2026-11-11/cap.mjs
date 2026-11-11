import puppeteer from '/home/raymond/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';
const [url,out,w,h,full,scheme]=process.argv.slice(2);
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--hide-scrollbars']});
const p=await b.newPage();
await p.setViewport({width:+w,height:+h,deviceScaleFactor:1});
if(scheme) await p.emulateMediaFeatures([{name:'prefers-color-scheme',value:scheme}]);
await p.goto(url,{waitUntil:"networkidle2",timeout:60000});await p.evaluate(()=>document.fonts.ready);await new Promise(r=>setTimeout(r,500));if(process.env.DEBORD){console.log(await p.evaluate(()=>[...document.querySelectorAll("body *")].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.tagName+"."+e.className+" "+Math.round(e.getBoundingClientRect().right)).slice(0,12).join("\n")))}
if(full==='1'){ // défile pour déclencher les animations puis capture par tranches
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<H;y+=h/2){await p.evaluate(y=>window.scrollTo(0,y),y);await new Promise(r=>setTimeout(r,180));}
  await p.evaluate(()=>window.scrollTo(0,0));await new Promise(r=>setTimeout(r,400));
  await p.screenshot({path:out,fullPage:true});
} else await p.screenshot({path:out});
await b.close();
