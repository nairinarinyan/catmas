export function treeTransformValues(radius, height, angle) {
    const b = radius * Math.sin(toRadians(angle));
    const a = Math.sqrt(Math.pow(height, 2) - Math.pow(b, 2));
    const x = radius * (1 - Math.cos(toRadians(angle)));

    let treeDelta = height - a + x;
    let treeAngle = -toDegrees(Math.asin(b / height));
    return { treeDelta, treeAngle };
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}