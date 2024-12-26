/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 * 
 */


class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // get the transformation matrix
        
        var transformationMatrix = this.trs.getTransformationMatrix();

        // Update matrices
        var transformedMvp = MatrixMult(mvp, transformationMatrix);
        var transformedNormals = MatrixMult(normalMatrix, transformationMatrix);
        var transformedModelView = MatrixMult(modelView, transformationMatrix);
        var transformedModel = MatrixMult(modelMatrix, transformationMatrix);

        // Draw children
        for (let child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

    }
    

    

}