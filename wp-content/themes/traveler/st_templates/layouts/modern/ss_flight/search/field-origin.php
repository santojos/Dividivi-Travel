<?php
/**
 * Created by wpbooking.
 * Developer: nasanji
 * Date: 2/6/2017
 * Version: 1.0
 */
wp_enqueue_style( 'st-select.css' );
wp_enqueue_script( 'st-select.js' );
?>




<div class="form-group form-group-lg form-group-icon-left st_left">
    <label for="ss_location_origin"><?php echo esc_html__('Origin', 'traveler'); ?></label>
    <div class="st-select-wrapper ss-flight-wrapper" >
        <input required id="ss_location_origin" onkeyup="stKeyupsmartSearchflights(this.value)" touchend="stKeyupsmartSearchflights(this)" type="text" class="form-control ss-flight-location required" autocomplete="off" data-value=""  value="" placeholder="<?php echo esc_html__('Enter your origin', 'traveler'); ?>" data-index="1">
    </div> <input type="hidden" id="airport_id" name="airport_id"/>
</div>
