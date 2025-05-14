
import { ElMessage } from "element-plus";


// 弹窗展示信息
export const showInfoToUser = (_message, _type = "info", _duration = 1000) => {
    ElMessage({
        message: _message,
        type: _type,
        duration: _duration,
        showClose: true,
        center: true,
        offset: 25,
    });
};