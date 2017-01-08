import { treeTransformValues } from './math';

export function setOrigins(base, tree) {
    base.originX = base.BBox.x + base.BBox.width / 2;
    base.originY = base.BBox.y + base.BBox.height;

    tree.originX = tree.BBox.x + tree.BBox.width / 2;
    tree.originY = tree.BBox.y;

    setValues(base, tree);
}

function setValues(base, tree) {
    let angle = 40;
    const duration = 400;

    base.visibleHeight = 100;

    document.getElementById('controls').addEventListener('click', e => {
        angle = e.offsetX > window.innerWidth/2 ? -Math.abs(angle) : Math.abs(angle);
        let { treeDelta, treeAngle } = treeTransformValues(base.visibleHeight, tree.visibleHeight, angle);

        tree.animBend(treeDelta, treeAngle, duration);
        base.animRotate(angle, duration);
    });
}
