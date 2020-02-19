<script>
    import tinycolor from 'tinycolor2'
    
    export let hour
    export let notes
    export let activityType
    export const labelStyle = {"background-color": tinycolor(activityType.color).lighten(15).toString()}
</script>

<style>
    .activity-row {
        cursor: pointer;
        margin-top: 5px;
        margin-left: 10px;
        margin-right: 10px;
        --border-radius: 10px;
        --padding-start: 0px;
        --inner-padding-end: 0px;
    }

    .icon {
        width: 32px;
        margin: 0;
        height: 60px;
        padding-left: 10px;
        padding-right: 10px;
        --border-radius: 10px;
    }

    .label {
        height: 60px;
    }
</style>

<div class='activity-row'>
    <!-- <div class='icon'>{activityType.icon}</div> -->
    <div class='label' style='background-color: #{activityType.color}'>{hour}</div>
</div>