import { useState, useEffect } from "react";
import { Shaders, Node, GLSL, ShaderDefinition } from "gl-react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { Surface } from 'gl-react-dom';
import { Card, Select } from 'antd';
import './index.less';
import { Scene, WebGLRenderer, PerspectiveCamera, LineBasicMaterial, BoxGeometry, Vector3, Line, ConeGeometry, ShaderMaterial } from 'three';

const { Meta } = Card;
const { Option } = Select;

const shaders = Shaders.create({
    helloBlue: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float blue;
    void main() {
    gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
    }`
    }
})

interface IProps {
    blue: number;
}

export default function (props: IProps) {
    const { blue = 1 } = props;
    const [blueStep, setBlueStep] = useState(0);

    useEffect(() => {
        /** webGL 兼容性 */
        if ( WEBGL.isWebGL2Available() === false ) document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
    }, [])
    return (
        <div className="container">
            <div className="stepDiv">
                <span className="textSpan">参数设置：</span>
                <Select style={{ width: '200px' }} onSelect={ (val: number) => setBlueStep(val) } >
                    {
                        Array.from({ length: 10 }, (i, j) => j).map((v, i) => {
                            return <Option value={i} label={v} key={v}>{ `${v}级` }</Option>
                        })
                    }
                </Select>
            </div>
            <div className="renderBox">
                 <Card
                    hoverable
                    style={{ width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Surface width={300} height={300}>
                        <Node shader={ shaders.helloBlue } uniforms={ { blue: blueStep } }></Node>
                    </Surface>
                </Card>
            </div>
        </div>
    )
}