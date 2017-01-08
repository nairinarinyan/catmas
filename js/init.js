function init() {
    const wrapper = document.getElementById('tree');
    const treeSVG = wrapper.contentDocument.querySelector('svg');

    const base = new SVGObject(treeSVG.getElementById('treebase'));
    const tree = new SVGObject(treeSVG.getElementById('tree'));

    setOrigins(base, tree);
}

window.addEventListener('load', init)
