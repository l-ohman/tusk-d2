// Using this file to import all images into an object so they can be accessed more easily

// importing every image from icons folder within an object
function importImages(reqs) {
    let images = {}
    reqs.keys().forEach(item => {
        images[item.slice(2,-10).replaceAll('_','')] = reqs(item);
    })
    return images;
}
const icons = importImages(require.context('../public/assets/heroIcons', false, /\.webp$/))
// reference the individual icons as `icons.HeroName` (no ' ' or '_')
console.log(icons)

export default function App () {
    return <h1>hello world!</h1>
}