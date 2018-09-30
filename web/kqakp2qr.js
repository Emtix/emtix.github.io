;
function PopupModule(settings) {
    var self = this;
    var timeout = 1000;
    var readyToShow = false;
    self.settings = settings;

    self.init = function() {
        var isPopupEnabled = self.settings.hasOwnProperty('section');
        var hasSettingsTimeout = self.settings.hasOwnProperty('timeout');
        var isSimplePreviewMode = window.hasOwnProperty('modulePopupPreview');
        var sectionID = self.settings['section'];
        var afPopup = window.hasOwnProperty('autofunnelModulePopup');

        // Выходим сразу, если не нужно его включать
        if (!isPopupEnabled) {
            return;
        }

        // Выбор кнопок и форм в автоворонке
        if (afPopup) {
            showSectionPopup(sectionID);
            $('#' + sectionID).find('.close-button:first').removeAttr('onclick');
            return;
        }

        // Обычный режим
        consoleDbg('module Pop-Up, section id: ' + sectionID);
        $(document).on('mouseleave', {sectionID: sectionID}, handleMouseLeave);

        // Set client settings
        if (!isSimplePreviewMode && hasSettingsTimeout) {
            timeout = parseInt(self.settings['timeout'], 10) * 1000;
        }

        registerPopup(sectionID);

        setTimeout(function() {
            console.log('module Pop-Up is ready');
            readyToShow = true;
        }, timeout);
    };

    function isPopupHasSomeBlocks (sectionPopupId) {
        var popup = $("#" + sectionPopupId);
        return (popup.length > 0 && popup.find('.blk').length > 0) ;
    }

    function handleMouseLeave(e) {
        var isSimplePreviewMode = window.hasOwnProperty('modulePopupPreview')
            , sectionID = e.data.sectionID;

        e = e || window.event; // IE
        if (readyToShow && e.data.hasOwnProperty('sectionID')) {
            //в превьюхе всегда показываем иначе проверяем есть ли в секции хоть какое-то кол-во блоков
            if (isSimplePreviewMode || isPopupHasSomeBlocks(sectionID)) {
                showSectionPopup(sectionID);
            }
            readyToShow = false;
        }
    }
}