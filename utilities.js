/**
 * Created by cesar on 26/8/16.
 */
export const beginSubmit = function (selector, target) {
    var $selector = $(selector)
    var $target = $(target)
    $selector.prop("disabled", true).find('[name], button, type').prop("disabled", true);
    $target.data('original-html', $target.html());
    $target.html('Wait <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>')
}
export const endSubmit = function (selector, target) {
    var $selector = $(selector)
    var $target = $(target)
    $selector.prop("disabled", true).find('[name], button, type, .btn').prop("disabled", false);
    $target.html($target.data('original-html'));
}


export class ProgressModal {
    constructor(title = 'Procesando...',
                body = 'Espere' +
                '<div class="progress ">' +
                '   <div class="progress-bar progress-bar-striped " style="width: 0%;"></div>' +
                '</div>',
                footer = '<p class="text-center">Por favor, no salga, refreseque la página o presione el botón de atrás de su navegador</p>') {
        this.title=title
        this.body=body
        this.footer=footer
        this.div = $(
            '<div class="modal fade" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">' +
            '   <div class="modal-dialog">' +
            '       <div class="modal-content">' +
            '           <div class="modal-header"><h3 >' + this.title + '</h3></div>' +
            '           <div class="modal-body">' +
            '              ' + this.body +
            '           </div>' +
            '           <div class="modal-footer text-center">' + this.footer + '</div>' +
            '       </div>' +
            '   </div>' +
            '</div>')
        this.val = 0
        this.interval = null
        this.pleaseWaitDiv = this.div.clone()
        this.isShow=false
    }
    stopInc() {
        clearInterval(this.interval)
    }
    hidePleaseWait() {
        this.setVal(100)
        this.stopInc()
        setTimeout(() => {
            this.isShow=false
            this.pleaseWaitDiv.modal('hide');
        }, 400)
    }
    setVal(val) {
        this.val = val;
        this.pleaseWaitDiv.find('.progress-bar').css('width', this.val + '%')
    }
    incVal() {
        this.val++;
        if (this.val > 100) {
            this.setVal(70)
        }
        this.setVal(this.val)
    }
    setTitle(title) {
        this.pleaseWaitDiv.find('.modal-header h3').text(title)
    }
    setBody(body) {
        this.stopInc()
        this.pleaseWaitDiv.find('.modal-body').html(body)
    }
    setFooter(footer) {
        this.pleaseWaitDiv.find('.modal-footer').html(footer)
    }
    showPleaseWait() {
        this.isShow=true
        this.pleaseWaitDiv = this.div.clone()
        this.pleaseWaitDiv.modal();
        this.pleaseWaitDiv.on('hidden.bs.modal', ()=> {
            this.isShow=false
            this.pleaseWaitDiv.remove()
            this.pleaseWaitDiv = this.div.clone();
        })
        this.setVal(0);
        this.interval = setInterval(()=> {
            this.incVal()
        }, 300)
    }
}

