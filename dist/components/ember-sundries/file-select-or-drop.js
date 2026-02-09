import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div ...attributes>\n  <EmberSundries::FileSelect\n    @buttonText={{@buttonText}}\n    @allowedFileTypesList={{@allowedFileTypesList}}\n    @allowedMimeTypesList={{@allowedMimeTypesList}}\n    @multiple={{@multiple}}\n    @fileProcessingAction={{@fileProcessingAction}}\n    class={{@fileSelectButtonClass}}\n    @disabled={{@disabled}}\n  />\n  <EmberSundries::FileDrop\n    @allowedFileTypesList={{@allowedFileTypesList}}\n    @fileProcessingAction={{@fileProcessingAction}}\n    @fileDropTextPrompt={{@fileDropTextPrompt}}\n    @fileDropTextPromptClass={{@fileDropTextPromptClass}}\n    @disabled={{@disabled}}\n    @fileDroppedWhenDisabledAction={{@fileDroppedWhenDisabledAction}}\n  />\n</div>");

class FileSelectOrDrop extends Component {}
setComponentTemplate(TEMPLATE, FileSelectOrDrop);

export { FileSelectOrDrop as default };
//# sourceMappingURL=file-select-or-drop.js.map
