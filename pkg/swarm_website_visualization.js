
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error('expected a boolean argument');
    }
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    if (typeof(heap_next) !== 'number') throw new Error('corrupt heap');

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error('expected a number argument');
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error('expected a string argument');

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}

function logError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            let error = (function () {
                try {
                    return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
                } catch(_) {
                    return "<failed to stringify thrown value>";
                }
            }());
            console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
            throw e;
        }
    };
}
function __wbg_adapter_24(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3e0e29a71843fb36(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_27(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha4b55e14a54d2a1c(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_30(arg0, arg1) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3c42895edaa83069(arg0, arg1);
}

/**
* @param {string} canvas_id
* @param {string} resource_dir
*/
export function init_visualization(canvas_id, resource_dir) {
    var ptr0 = passStringToWasm0(canvas_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(resource_dir, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.init_visualization(ptr0, len0, ptr1, len1);
}

/**
*/
export function main_function() {
    wasm.main_function();
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}

function getArrayI32FromWasm0(ptr, len) {
    return getInt32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        var ret = false;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_log_4fe9054837027412 = logError(function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    });
    imports.wbg.__wbg_instanceof_WebGl2RenderingContext_836e46859b2055b5 = logError(function(arg0) {
        var ret = getObject(arg0) instanceof WebGL2RenderingContext;
        _assertBoolean(ret);
        return ret;
    });
    imports.wbg.__wbg_bindBufferRange_3dfb690311ada5c0 = logError(function(arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).bindBufferRange(arg1 >>> 0, arg2 >>> 0, getObject(arg3), arg4, arg5);
    });
    imports.wbg.__wbg_bindVertexArray_8bb02f8645a29e05 = logError(function(arg0, arg1) {
        getObject(arg0).bindVertexArray(getObject(arg1));
    });
    imports.wbg.__wbg_bufferData_a49730b56e5517bc = logError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).bufferData(arg1 >>> 0, getArrayU8FromWasm0(arg2, arg3), arg4 >>> 0);
    });
    imports.wbg.__wbg_bufferSubData_42e14346b62c0a85 = logError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).bufferSubData(arg1 >>> 0, arg2, getArrayU8FromWasm0(arg3, arg4));
    });
    imports.wbg.__wbg_createVertexArray_fd08eb7c8f8e86a3 = logError(function(arg0) {
        var ret = getObject(arg0).createVertexArray();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_deleteVertexArray_b966baf643cbbf5b = logError(function(arg0, arg1) {
        getObject(arg0).deleteVertexArray(getObject(arg1));
    });
    imports.wbg.__wbg_getUniformBlockIndex_ffda6282b14d7087 = logError(function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).getUniformBlockIndex(getObject(arg1), getStringFromWasm0(arg2, arg3));
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_texImage2D_917b0bb22a5467b7 = handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9 === 0 ? undefined : getArrayU8FromWasm0(arg9, arg10));
    });
    imports.wbg.__wbg_uniform1iv_418d8c1495df6187 = logError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).uniform1iv(getObject(arg1), getArrayI32FromWasm0(arg2, arg3));
    });
    imports.wbg.__wbg_uniformBlockBinding_762aa6c06bda445f = logError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).uniformBlockBinding(getObject(arg1), arg2 >>> 0, arg3 >>> 0);
    });
    imports.wbg.__wbg_activeTexture_9d96cecdacbe1a7d = logError(function(arg0, arg1) {
        getObject(arg0).activeTexture(arg1 >>> 0);
    });
    imports.wbg.__wbg_attachShader_1924aa4a49a31418 = logError(function(arg0, arg1, arg2) {
        getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
    });
    imports.wbg.__wbg_bindBuffer_6a7df3ea760a2c83 = logError(function(arg0, arg1, arg2) {
        getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
    });
    imports.wbg.__wbg_bindTexture_a03a7320443c8a4d = logError(function(arg0, arg1, arg2) {
        getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
    });
    imports.wbg.__wbg_clear_256f95c85e2d5b47 = logError(function(arg0, arg1) {
        getObject(arg0).clear(arg1 >>> 0);
    });
    imports.wbg.__wbg_clearColor_5941bfbf220e0165 = logError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
    });
    imports.wbg.__wbg_compileShader_18c92b61889a02b6 = logError(function(arg0, arg1) {
        getObject(arg0).compileShader(getObject(arg1));
    });
    imports.wbg.__wbg_createBuffer_7fadf474857a2122 = logError(function(arg0) {
        var ret = getObject(arg0).createBuffer();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_createProgram_8d6f13ab051f686a = logError(function(arg0) {
        var ret = getObject(arg0).createProgram();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_createShader_bc89b940e81883dd = logError(function(arg0, arg1) {
        var ret = getObject(arg0).createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_createTexture_e172faa9d6a303c1 = logError(function(arg0) {
        var ret = getObject(arg0).createTexture();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_deleteBuffer_e06fcb6201291d2e = logError(function(arg0, arg1) {
        getObject(arg0).deleteBuffer(getObject(arg1));
    });
    imports.wbg.__wbg_deleteProgram_c33ed33d83373050 = logError(function(arg0, arg1) {
        getObject(arg0).deleteProgram(getObject(arg1));
    });
    imports.wbg.__wbg_deleteShader_80c56945efc9e910 = logError(function(arg0, arg1) {
        getObject(arg0).deleteShader(getObject(arg1));
    });
    imports.wbg.__wbg_deleteTexture_71c09d0186504319 = logError(function(arg0, arg1) {
        getObject(arg0).deleteTexture(getObject(arg1));
    });
    imports.wbg.__wbg_drawElements_0376b48b08ac34a7 = logError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
    });
    imports.wbg.__wbg_enable_28a715ea384ce803 = logError(function(arg0, arg1) {
        getObject(arg0).enable(arg1 >>> 0);
    });
    imports.wbg.__wbg_enableVertexAttribArray_fafa57fbcd454495 = logError(function(arg0, arg1) {
        getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
    });
    imports.wbg.__wbg_getError_a6d456156995e29e = logError(function(arg0) {
        var ret = getObject(arg0).getError();
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_getParameter_d680f5c6d50aba30 = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).getParameter(arg1 >>> 0);
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getProgramInfoLog_221be6701c636176 = logError(function(arg0, arg1, arg2) {
        var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    });
    imports.wbg.__wbg_getProgramParameter_d2854e9210e85494 = logError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getShaderInfoLog_1071a8467544f43b = logError(function(arg0, arg1, arg2) {
        var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    });
    imports.wbg.__wbg_getShaderParameter_f942fc2044b16ba0 = logError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_getUniformLocation_d6e4f5bee8a84579 = logError(function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_linkProgram_a5fd2d3a29f244c0 = logError(function(arg0, arg1) {
        getObject(arg0).linkProgram(getObject(arg1));
    });
    imports.wbg.__wbg_pixelStorei_1312089c29e9a435 = logError(function(arg0, arg1, arg2) {
        getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
    });
    imports.wbg.__wbg_shaderSource_1804c02eec34a9c2 = logError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
    });
    imports.wbg.__wbg_texParameteri_f3be7a9c7fc03dac = logError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    });
    imports.wbg.__wbg_useProgram_9523fdac78894a60 = logError(function(arg0, arg1) {
        getObject(arg0).useProgram(getObject(arg1));
    });
    imports.wbg.__wbg_vertexAttribPointer_88010123ef756633 = logError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    });
    imports.wbg.__wbg_viewport_30b14839e31d0b61 = logError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).viewport(arg1, arg2, arg3, arg4);
    });
    imports.wbg.__wbg_instanceof_Window_adf3196bdc02b386 = logError(function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        _assertBoolean(ret);
        return ret;
    });
    imports.wbg.__wbg_document_6cc8d0b87c0a99b9 = logError(function(arg0) {
        var ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_performance_8594a974edffb1dc = logError(function(arg0) {
        var ret = getObject(arg0).performance;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_cancelAnimationFrame_7f3ba4191e67c86b = handleError(function(arg0, arg1) {
        getObject(arg0).cancelAnimationFrame(arg1);
    });
    imports.wbg.__wbg_requestAnimationFrame_89935c9d6ac25d2f = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_addEventListener_9e7b0c3f65ebc0d7 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_removeEventListener_e118aefce350c930 = handleError(function(arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    });
    imports.wbg.__wbg_setonprogress_75a9c80307313dd6 = logError(function(arg0, arg1) {
        getObject(arg0).onprogress = getObject(arg1);
    });
    imports.wbg.__wbg_setonload_5c646c079962be08 = logError(function(arg0, arg1) {
        getObject(arg0).onload = getObject(arg1);
    });
    imports.wbg.__wbg_setonloadend_7500108e4d2a5eb6 = logError(function(arg0, arg1) {
        getObject(arg0).onloadend = getObject(arg1);
    });
    imports.wbg.__wbg_lengthComputable_26c86e0ce1156f4c = logError(function(arg0) {
        var ret = getObject(arg0).lengthComputable;
        _assertBoolean(ret);
        return ret;
    });
    imports.wbg.__wbg_loaded_d04aa9e44838257b = logError(function(arg0) {
        var ret = getObject(arg0).loaded;
        return ret;
    });
    imports.wbg.__wbg_total_b92d43a6ef725c8e = logError(function(arg0) {
        var ret = getObject(arg0).total;
        return ret;
    });
    imports.wbg.__wbg_deltaY_35bf8632b9f25820 = logError(function(arg0) {
        var ret = getObject(arg0).deltaY;
        return ret;
    });
    imports.wbg.__wbg_now_49847177a6d1d57e = logError(function(arg0) {
        var ret = getObject(arg0).now();
        return ret;
    });
    imports.wbg.__wbg_getElementById_0cb6ad9511b1efc0 = logError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_requestPointerLock_b7b7b484a39c776f = logError(function(arg0) {
        getObject(arg0).requestPointerLock();
    });
    imports.wbg.__wbg_offsetX_204ab4b52fb9d668 = logError(function(arg0) {
        var ret = getObject(arg0).offsetX;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_offsetY_3d8860ff1285d58d = logError(function(arg0) {
        var ret = getObject(arg0).offsetY;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_button_13536d578538c005 = logError(function(arg0) {
        var ret = getObject(arg0).button;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_buttons_dff0494da85871b5 = logError(function(arg0) {
        var ret = getObject(arg0).buttons;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_movementX_8d0fe2ebeff779ef = logError(function(arg0) {
        var ret = getObject(arg0).movementX;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_movementY_f928be0f4a374879 = logError(function(arg0) {
        var ret = getObject(arg0).movementY;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_setresponseType_a1d73d7ce6da2807 = logError(function(arg0, arg1) {
        getObject(arg0).responseType = takeObject(arg1);
    });
    imports.wbg.__wbg_response_c6eaec6d637dbe7c = handleError(function(arg0) {
        var ret = getObject(arg0).response;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_4f753605d5d80054 = handleError(function() {
        var ret = new XMLHttpRequest();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_open_65a499fc1123aaa6 = handleError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    });
    imports.wbg.__wbg_send_85a5d32b3e0745ad = handleError(function(arg0) {
        getObject(arg0).send();
    });
    imports.wbg.__wbg_repeat_a5baf4d736bde57a = logError(function(arg0) {
        var ret = getObject(arg0).repeat;
        _assertBoolean(ret);
        return ret;
    });
    imports.wbg.__wbg_key_590d4d2a765d1b58 = logError(function(arg0, arg1) {
        var ret = getObject(arg1).key;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    });
    imports.wbg.__wbg_preventDefault_93d06688748bfc14 = logError(function(arg0) {
        getObject(arg0).preventDefault();
    });
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_4f5b5ec6cd53ccf3 = logError(function(arg0) {
        var ret = getObject(arg0) instanceof HTMLCanvasElement;
        _assertBoolean(ret);
        return ret;
    });
    imports.wbg.__wbg_width_a22f9855caa54b53 = logError(function(arg0) {
        var ret = getObject(arg0).width;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_height_9a404a6b3c61c7ef = logError(function(arg0) {
        var ret = getObject(arg0).height;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_getContext_37ca0870acb096d9 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    });
    imports.wbg.__wbg_newnoargs_f3b8a801d5d4b079 = logError(function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_call_8e95613cc6524977 = handleError(function(arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_call_d713ea0274dfc6d2 = handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_globalThis_b9277fc37e201fe5 = handleError(function() {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_self_07b2f89e82ceb76d = handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_window_ba85d88572adc0dc = handleError(function() {
        var ret = window.window;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_global_e16303fe83e1d57f = handleError(function() {
        var ret = global.global;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_new_9b295d24cf1d706f = logError(function(arg0) {
        var ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_length_2b13641a9d906653 = logError(function(arg0) {
        var ret = getObject(arg0).length;
        _assertNum(ret);
        return ret;
    });
    imports.wbg.__wbg_set_3bb960a9975f3cd2 = logError(function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    });
    imports.wbg.__wbg_buffer_49131c283a06686f = logError(function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    });
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = logError(function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    });
    imports.wbg.__wbg_new_59cb74e423758ede = logError(function() {
        var ret = new Error();
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_stack_558ba5917b466edd = logError(function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    });
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'number' ? obj : undefined;
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        _assertNum(ret);
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper2408 = logError(function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 42, __wbg_adapter_24);
        return addHeapObject(ret);
    });
    imports.wbg.__wbindgen_closure_wrapper2410 = logError(function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_27);
        return addHeapObject(ret);
    });
    imports.wbg.__wbindgen_closure_wrapper2412 = logError(function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 38, __wbg_adapter_30);
        return addHeapObject(ret);
    });

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    wasm.__wbindgen_start();
    return wasm;
}

export default init;

